"use client";

import { useCallback, useMemo, useRef, useState } from "react";
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
    const activeRequestId = requestIdRef.current + 1;
    requestIdRef.current = activeRequestId;
    setViewState("loading");

    const requestBody: QueryRequestBody = {
      query,
      jurisdiction,
      userId,
      saveQuery: canSaveQuery ? saveQuery : false
    };

    try {
      const result = await postQueryRequest(requestBody);
      if (requestIdRef.current !== activeRequestId) {
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
    } catch (error) {
      if (requestIdRef.current !== activeRequestId) {
        return;
      }

      const message = error instanceof Error ? error.message : "Unknown frontend query failure.";
      const fallbackResponse = buildClientSystemErrorResponse({ message, jurisdiction });

      setResponse(fallbackResponse);
      setViewState("system_error");
      setHistory((previous) =>
        [buildHistoryEntry({ query, jurisdiction, response: fallbackResponse }), ...previous].slice(
          0,
          MAX_HISTORY_ENTRIES
        )
      );
    }
  }, [query, jurisdiction, userId, canSaveQuery, saveQuery]);

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

