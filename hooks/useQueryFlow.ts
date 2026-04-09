"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { postQueryRequest } from "@/lib/api/query";
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
const MAX_HISTORY_ENTRIES = 8;
const REQUEST_TIMEOUT_MS = 12000;
const DEBUG_QUERY_FLOW = process.env.NODE_ENV !== "production";

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

function buildClientSystemErrorResponse(input: {
  message: string;
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
          content: "System failure while reaching the query backend."
        }
      ],
      limitations: "The frontend could not complete a valid request to /v1/query."
    },
    citations: [],
    sourcesUsed: 0,
    error: {
      code: "system_error",
      message: input.message,
      details: ["Inspect frontend/backend connectivity and API URL configuration."]
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

  const resetToIdle = useCallback(() => {
    setResponse(null);
    setViewState("idle");
  }, []);

  const resetForm = useCallback(() => {
    setQuery(DEFAULT_QUERY);
    setJurisdiction(DEFAULT_JURISDICTION);
    setSaveQuery(false);
  }, []);

  const applyHistoryEntry = useCallback((entry: QueryHistoryEntry) => {
    setQuery(entry.query);
    setJurisdiction(entry.jurisdiction);
    setResponse(null);
    setViewState("idle");
  }, []);

  const submitQuery = useCallback(async () => {
    if (viewState === "loading") {
      logQueryFlow("submit_ignored_loading_in_progress", {
        requestId: requestIdRef.current
      });
      return;
    }

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
      saveQuery: requestBody.saveQuery
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
      const fallbackResponse = buildClientSystemErrorResponse({ message, jurisdiction });

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
    if (!response) {
      return null;
    }

    if (response.resultStatus === "rate_limited") {
      return response.error.code === "DUPLICATE_QUERY_SUBMISSION"
        ? "Duplicate request blocked within short dedup window."
        : "Rate limit reached for this actor window.";
    }

    if (response.resultStatus === "validation_error") {
      return "Request validation failed. Review query input.";
    }

    if (response.resultStatus === "system_error") {
      return "Backend/system error while processing query.";
    }

    if (response.resultStatus === "no_results") {
      return "No grounded source support found for current query scope.";
    }

    if (response.resultStatus === "partial") {
      return "Partial grounded result with limited support.";
    }

    return "Grounded query completed successfully.";
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
    validationDetails,
    statusMessage,
    isLoading: viewState === "loading",
    setQuery,
    setJurisdiction,
    setSaveQuery,
    submitQuery,
    resetToIdle,
    resetForm,
    applyHistoryEntry
  };
}
