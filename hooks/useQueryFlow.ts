"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { postQueryRequest } from "@/lib/api/query";
import { detectJurisdictionMismatch } from "@/lib/query/jurisdiction-mismatch";
import { resolveQueryStatusMessage } from "@/lib/query/status-message";
import type {
  QueryErrorResponse,
  QueryHistoryEntry,
  QueryRequestBody,
  QueryResponse,
  QueryViewState
} from "@/types/query";

const DEFAULT_QUERY =
  "What are the licensing implications for a fintech firm in DIFC?";
const DEFAULT_JURISDICTION = "DIFC";
const MAX_HISTORY_ENTRIES = 40;
const DEFAULT_REQUEST_TIMEOUT_MS = 22000;
const DEBUG_QUERY_FLOW = process.env.NODE_ENV !== "production";

function resolveRequestTimeoutMs(): number {
  const rawValue = process.env.NEXT_PUBLIC_QUERY_REQUEST_TIMEOUT_MS;
  if (!rawValue) {
    return DEFAULT_REQUEST_TIMEOUT_MS;
  }

  const parsed = Number(rawValue);
  if (!Number.isInteger(parsed) || parsed < 2000) {
    return DEFAULT_REQUEST_TIMEOUT_MS;
  }

  return parsed;
}

const REQUEST_TIMEOUT_MS = resolveRequestTimeoutMs();

interface UseQueryFlowOptions {
  initialQuery?: string;
  initialJurisdiction?: string | null;
  userId?: string | null;
}

function buildHistoryEntry(input: {
  query: string;
  jurisdiction: string | null;
  response: QueryResponse;
}): QueryHistoryEntry {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`,
    queryId: input.response.queryId,
    query: input.query,
    jurisdiction: input.jurisdiction,
    resultStatus: input.response.resultStatus,
    createdAt: new Date().toISOString()
  };
}

function buildClientValidationErrorResponse(input: {
  jurisdiction: string | null;
  message: string;
  details: string[];
  limitations?: string;
}): QueryErrorResponse {
  return {
    resultStatus: "validation_error",
    queryId: null,
    jurisdiction: input.jurisdiction,
    answer: {
      summary: "Query request needs adjustment before execution.",
      body: [
        {
          sectionTitle: "Input alignment",
          content: "The query and selected scope must be aligned before submission."
        }
      ],
      limitations:
        input.limitations ??
        "The request was blocked locally to avoid sending a conflicting jurisdiction scope."
    },
    citations: [],
    sourcesUsed: 0,
    error: {
      code: "validation_error",
      message: input.message,
      details: input.details
    }
  };
}

function buildClientSystemErrorResponse(input: {
  jurisdiction: string | null;
}): QueryErrorResponse {
  return {
    resultStatus: "system_error",
    queryId: null,
    jurisdiction: input.jurisdiction,
    answer: {
      summary: "Query request could not be completed.",
      body: [
        {
          sectionTitle: "Execution status",
          content: "The request could not be completed due to a temporary service interruption."
        }
      ],
      limitations:
        "No result was produced for this attempt. Retry the request after a short pause."
    },
    citations: [],
    sourcesUsed: 0,
    error: {
      code: "system_error",
      message: "The query could not be completed right now.",
      details: [
        "Wait a moment and retry.",
        "If it keeps failing, rephrase the question and submit again."
      ]
    }
  };
}

function logQueryFlow(event: string, payload: Record<string, unknown>) {
  if (!DEBUG_QUERY_FLOW) {
    return;
  }

  console.info("[query-flow]", event, payload);
}

function toDurationMs(startedAt: number): number {
  return Number((performance.now() - startedAt).toFixed(2));
}

export function useQueryFlow(options: UseQueryFlowOptions = {}) {
  const userId = options.userId ?? null;
  const canSaveQuery = Boolean(userId);

  const [query, setQuery] = useState(options.initialQuery ?? DEFAULT_QUERY);
  const [jurisdiction, setJurisdiction] = useState<string | null>(
    options.initialJurisdiction ?? DEFAULT_JURISDICTION
  );
  const [saveQuery, setSaveQuery] = useState(false);
  const [viewState, setViewState] = useState<QueryViewState>("idle");
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [history, setHistory] = useState<QueryHistoryEntry[]>([]);
  const [preSubmitWarning, setPreSubmitWarning] = useState<string | null>(null);

  const requestIdRef = useRef(0);
  const activeAbortControllerRef = useRef<AbortController | null>(null);
  const previousViewStateRef = useRef<QueryViewState>("idle");

  useEffect(() => {
    return () => {
      activeAbortControllerRef.current?.abort();
      activeAbortControllerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!DEBUG_QUERY_FLOW) {
      previousViewStateRef.current = viewState;
      return;
    }

    if (previousViewStateRef.current !== viewState) {
      logQueryFlow("view_state_transition", {
        from: previousViewStateRef.current,
        to: viewState,
        resultStatus: response?.resultStatus ?? null
      });
      previousViewStateRef.current = viewState;
    }
  }, [viewState, response]);

  useEffect(() => {
    if (!preSubmitWarning) {
      return;
    }

    setPreSubmitWarning(null);
  }, [query, jurisdiction, preSubmitWarning]);

  const resetToIdle = useCallback(() => {
    setResponse(null);
    setViewState("idle");
    setPreSubmitWarning(null);
  }, []);

  const resetForm = useCallback(() => {
    setQuery(DEFAULT_QUERY);
    setJurisdiction(DEFAULT_JURISDICTION);
    setSaveQuery(false);
    setPreSubmitWarning(null);
  }, []);

  const applyHistoryEntry = useCallback((entry: QueryHistoryEntry) => {
    setQuery(entry.query);
    setJurisdiction(entry.jurisdiction);
    setResponse(null);
    setViewState("idle");
  }, []);

  const removeHistoryEntry = useCallback((entryId: string) => {
    setHistory((previous) => previous.filter((entry) => entry.id !== entryId));
  }, []);

  const submitQuery = useCallback(async () => {
    if (viewState === "loading") {
      logQueryFlow("submit_ignored_loading_in_progress", {
        requestId: requestIdRef.current
      });
      return;
    }

    const mismatch = detectJurisdictionMismatch({ query, jurisdiction });
    if (mismatch) {
      const warning = `Selected jurisdiction ${mismatch.selectedJurisdiction} conflicts with query terms (${mismatch.matchedTerms.join(
        ", "
      )}). Choose the matching jurisdiction or use All jurisdictions.`;

      setPreSubmitWarning(warning);

      const mismatchResponse = buildClientValidationErrorResponse({
        jurisdiction,
        message: "Jurisdiction scope conflicts with terms in the query text.",
        details: [
          `Selected scope: ${mismatch.selectedJurisdiction}`,
          `Detected conflicting terms: ${mismatch.matchedTerms.join(", ")}`,
          "Choose a matching jurisdiction or set scope to All jurisdictions before submitting."
        ],
        limitations:
          "The request was blocked before backend execution because scope and query terms conflict."
      });

      setResponse(mismatchResponse);
      setViewState("validation_error");

      logQueryFlow("submit_blocked_jurisdiction_mismatch", {
        selectedJurisdiction: mismatch.selectedJurisdiction,
        matchedTerms: mismatch.matchedTerms
      });
      return;
    }

    setPreSubmitWarning(null);

    const activeRequestId = requestIdRef.current + 1;
    requestIdRef.current = activeRequestId;
    const submittedAt = performance.now();

    activeAbortControllerRef.current?.abort();
    const abortController = new AbortController();
    activeAbortControllerRef.current = abortController;
    const timeout = setTimeout(() => abortController.abort(), REQUEST_TIMEOUT_MS);

    setResponse(null);
    setViewState("loading");

    const requestBody: QueryRequestBody = {
      query,
      jurisdiction,
      userId,
      saveQuery: canSaveQuery ? saveQuery : false
    };

    logQueryFlow("submit_start", {
      requestId: activeRequestId,
      queryLength: query.length,
      jurisdiction,
      hasUserId: Boolean(userId),
      saveQuery: requestBody.saveQuery,
      timeoutMs: REQUEST_TIMEOUT_MS
    });

    try {
      const result = await postQueryRequest(requestBody, {
        signal: abortController.signal
      });

      if (requestIdRef.current !== activeRequestId) {
        logQueryFlow("submit_response_ignored_stale", {
          requestId: activeRequestId
        });
        return;
      }

      setResponse(result.payload);
      setViewState(result.payload.resultStatus);
      setHistory((previous) =>
        [buildHistoryEntry({ query, jurisdiction, response: result.payload }), ...previous].slice(
          0,
          MAX_HISTORY_ENTRIES
        )
      );

      logQueryFlow("submit_success", {
        requestId: activeRequestId,
        httpStatus: result.httpStatus,
        resultStatus: result.payload.resultStatus,
        durationMs: toDurationMs(submittedAt)
      });
    } catch (error) {
      if (requestIdRef.current !== activeRequestId) {
        logQueryFlow("submit_error_ignored_stale", {
          requestId: activeRequestId
        });
        return;
      }

      const message =
        error instanceof Error && error.name === "AbortError"
          ? `Query request timed out after ${REQUEST_TIMEOUT_MS}ms.`
          : error instanceof Error
            ? error.message
            : "Unknown frontend query failure.";
      const fallbackResponse = buildClientSystemErrorResponse({ jurisdiction });

      setResponse(fallbackResponse);
      setViewState("system_error");
      setHistory((previous) =>
        [buildHistoryEntry({ query, jurisdiction, response: fallbackResponse }), ...previous].slice(
          0,
          MAX_HISTORY_ENTRIES
        )
      );

      logQueryFlow("submit_failure", {
        requestId: activeRequestId,
        message,
        durationMs: toDurationMs(submittedAt)
      });
    } finally {
      clearTimeout(timeout);
      if (activeAbortControllerRef.current === abortController) {
        activeAbortControllerRef.current = null;
      }
    }
  }, [query, jurisdiction, userId, canSaveQuery, saveQuery, viewState]);

  const validationDetails = useMemo(() => {
    if (!response || response.resultStatus !== "validation_error") {
      return [];
    }

    return response.error.details ?? [];
  }, [response]);

  const statusMessage = useMemo(() => {
    return resolveQueryStatusMessage(response);
  }, [response]);

  return {
    query,
    jurisdiction,
    saveQuery,
    canSaveQuery,
    userId,
    viewState,
    response,
    history,
    preSubmitWarning,
    validationDetails,
    statusMessage,
    isLoading: viewState === "loading",
    setQuery,
    setJurisdiction,
    setSaveQuery,
    submitQuery,
    resetToIdle,
    resetForm,
    applyHistoryEntry,
    removeHistoryEntry
  };
}
