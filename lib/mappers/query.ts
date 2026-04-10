import {
  QUERY_ERROR_STATUSES,
  QUERY_RESULT_STATUSES,
  QUERY_SUCCESS_STATUSES,
  type QueryAnswer,
  type QueryAnswerSection,
  type QueryCitation,
  type QueryErrorCode,
  type QueryErrorInfo,
  type QueryErrorResponse,
  type QueryErrorStatus,
  type QueryResponse,
  type QuerySynthesisTraceStatus,
  type QueryTrace,
  type QueryTraceBranch,
  type QueryResultStatus,
  type QuerySuccessResponse,
  type QuerySuccessStatus
} from "@/types/query";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asNonEmptyString(value: unknown, field: string): string {
  if (typeof value !== "string") {
    throw new Error(`Invalid '${field}': expected string.`);
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    throw new Error(`Invalid '${field}': expected non-empty string.`);
  }

  return trimmed;
}

function asNullableString(value: unknown, field: string): string | null {
  if (value === null) {
    return null;
  }

  return asNonEmptyString(value, field);
}

function asInteger(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    throw new Error(`Invalid '${field}': expected integer.`);
  }

  if (value < 0) {
    throw new Error(`Invalid '${field}': expected non-negative integer.`);
  }

  return value;
}

function asBoolean(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") {
    throw new Error(`Invalid '${field}': expected boolean.`);
  }

  return value;
}

function parseAnswerSection(value: unknown, index: number): QueryAnswerSection {
  if (!isRecord(value)) {
    throw new Error(`Invalid 'answer.body[${index}]': expected object.`);
  }

  return {
    sectionTitle: asNonEmptyString(value.sectionTitle, `answer.body[${index}].sectionTitle`),
    content: asNonEmptyString(value.content, `answer.body[${index}].content`)
  };
}

function parseAnswer(value: unknown): QueryAnswer {
  if (!isRecord(value)) {
    throw new Error("Invalid 'answer': expected object.");
  }

  if (!Array.isArray(value.body)) {
    throw new Error("Invalid 'answer.body': expected array.");
  }

  const limitations =
    value.limitations === undefined ? undefined : asNonEmptyString(value.limitations, "answer.limitations");

  return {
    summary: asNonEmptyString(value.summary, "answer.summary"),
    body: value.body.map((item, index) => parseAnswerSection(item, index)),
    limitations
  };
}

function parseCitation(value: unknown, index: number): QueryCitation {
  if (!isRecord(value)) {
    throw new Error(`Invalid 'citations[${index}]': expected object.`);
  }

  return {
    sourceName: asNonEmptyString(value.sourceName, `citations[${index}].sourceName`),
    documentTitle: asNonEmptyString(value.documentTitle, `citations[${index}].documentTitle`),
    publishedAt: asNullableString(value.publishedAt, `citations[${index}].publishedAt`),
    sourceType: asNullableString(value.sourceType, `citations[${index}].sourceType`),
    url: asNullableString(value.url, `citations[${index}].url`)
  };
}

function parseCitations(value: unknown): QueryCitation[] {
  if (!Array.isArray(value)) {
    throw new Error("Invalid 'citations': expected array.");
  }

  return value.map((item, index) => parseCitation(item, index));
}

function asOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function asOptionalNullableString(value: unknown): string | null | undefined {
  if (value === null) {
    return null;
  }

  return asOptionalString(value);
}

function asOptionalNonNegativeInteger(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    return undefined;
  }

  return value;
}

function toSynthesisTraceStatus(status: QuerySuccessStatus): QuerySynthesisTraceStatus {
  if (status === "no_results") {
    return "not_produced";
  }

  if (status === "partial") {
    return "partial";
  }

  if (status === "success") {
    return "complete";
  }

  return "unknown";
}

function parseTraceBranch(value: unknown): QueryTraceBranch {
  if (!isRecord(value)) {
    return {
      matches: null,
      deferred: null,
      deferredReason: null,
      deferredReasonCode: null
    };
  }

  const matches = asOptionalNonNegativeInteger(value.matches);
  const deferred = typeof value.deferred === "boolean" ? value.deferred : null;

  return {
    matches: matches ?? null,
    deferred,
    deferredReason: asOptionalNullableString(value.deferredReason) ?? null,
    deferredReasonCode: asOptionalNullableString(value.deferredReasonCode) ?? null
  };
}

function parseTrace(
  value: unknown,
  fallback: { resultStatus: QuerySuccessStatus; jurisdiction: string | null; sourcesUsed: number }
): QueryTrace {
  if (!isRecord(value)) {
    return {
      vectorRetrieval: {
        matches: null,
        deferred: null,
        deferredReason: null,
        deferredReasonCode: null
      },
      keywordRetrieval: {
        matches: null,
        deferred: null,
        deferredReason: null,
        deferredReasonCode: null
      },
      embeddingLayer: {
        status: "unknown",
        model: null,
        dimension: null,
        deferredReasonCode: null
      },
      groundedSources: fallback.sourcesUsed,
      synthesis: { status: toSynthesisTraceStatus(fallback.resultStatus) },
      scope: { jurisdiction: fallback.jurisdiction }
    };
  }

  const synthesisStatusRaw = asOptionalString(value.synthesis && isRecord(value.synthesis) ? value.synthesis.status : undefined);
  const synthesisStatus: QuerySynthesisTraceStatus =
    synthesisStatusRaw === "complete" ||
    synthesisStatusRaw === "partial" ||
    synthesisStatusRaw === "not_produced"
      ? synthesisStatusRaw
      : "unknown";

  const scopeJurisdiction =
    isRecord(value.scope) && (typeof value.scope.jurisdiction === "string" || value.scope.jurisdiction === null)
      ? (value.scope.jurisdiction as string | null)
      : fallback.jurisdiction;

  const groundedSources = asOptionalNonNegativeInteger(value.groundedSources) ?? fallback.sourcesUsed;
  const embeddingLayerRaw = isRecord(value.embeddingLayer) ? value.embeddingLayer : null;
  const embeddingStatusRaw = asOptionalString(embeddingLayerRaw?.status);
  const embeddingStatus =
    embeddingStatusRaw === "ready" ||
    embeddingStatusRaw === "deferred" ||
    embeddingStatusRaw === "mismatch" ||
    embeddingStatusRaw === "not_reported"
      ? embeddingStatusRaw
      : "unknown";
  const embeddingDimension = asOptionalNonNegativeInteger(embeddingLayerRaw?.dimension);

  return {
    vectorRetrieval: parseTraceBranch(value.vectorRetrieval),
    keywordRetrieval: parseTraceBranch(value.keywordRetrieval),
    embeddingLayer: {
      status: embeddingStatus,
      model: asOptionalNullableString(embeddingLayerRaw?.model) ?? null,
      dimension: embeddingDimension ?? null,
      deferredReasonCode: asOptionalNullableString(embeddingLayerRaw?.deferredReasonCode) ?? null
    },
    groundedSources,
    synthesis: { status: synthesisStatus },
    scope: { jurisdiction: scopeJurisdiction }
  };
}

function coerceAnswerForPartialFallback(value: unknown): QueryAnswer {
  const summaryFallback = "A partial grounded response was returned by the backend.";
  const bodyFallback: QueryAnswerSection[] = [
    {
      sectionTitle: "Execution status",
      content:
        "The backend returned a partial result, but part of the payload did not match the strict frontend parser."
    }
  ];

  if (!isRecord(value)) {
    return {
      summary: summaryFallback,
      body: bodyFallback,
      limitations:
        "Rendering uses a safe fallback for partial responses when strict payload validation fails."
    };
  }

  const summary = asOptionalString(value.summary) ?? summaryFallback;
  const limitations = asOptionalString(value.limitations);
  const body = Array.isArray(value.body)
    ? value.body
        .map((item) => {
          if (!isRecord(item)) {
            return null;
          }

          const sectionTitle = asOptionalString(item.sectionTitle);
          const content = asOptionalString(item.content);
          if (!sectionTitle || !content) {
            return null;
          }

          return {
            sectionTitle,
            content
          } satisfies QueryAnswerSection;
        })
        .filter((section): section is QueryAnswerSection => section !== null)
    : [];

  return {
    summary,
    body: body.length > 0 ? body : bodyFallback,
    limitations
  };
}

function coerceCitationsForPartialFallback(value: unknown): QueryCitation[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!isRecord(item)) {
        return null;
      }

      const sourceName = asOptionalString(item.sourceName);
      const documentTitle = asOptionalString(item.documentTitle);
      if (!sourceName || !documentTitle) {
        return null;
      }

      return {
        sourceName,
        documentTitle,
        publishedAt: asOptionalNullableString(item.publishedAt) ?? null,
        sourceType: asOptionalNullableString(item.sourceType) ?? null,
        url: asOptionalNullableString(item.url) ?? null
      } satisfies QueryCitation;
    })
    .filter((citation): citation is QueryCitation => citation !== null);
}

function isQueryResultStatus(value: string): value is QueryResultStatus {
  return (QUERY_RESULT_STATUSES as readonly string[]).includes(value);
}

function isQuerySuccessStatus(value: string): value is QuerySuccessStatus {
  return (QUERY_SUCCESS_STATUSES as readonly string[]).includes(value);
}

function isQueryErrorStatus(value: string): value is QueryErrorStatus {
  return (QUERY_ERROR_STATUSES as readonly string[]).includes(value);
}

function isQueryErrorCode(value: string): value is QueryErrorCode {
  return [
    "validation_error",
    "system_error",
    "RATE_LIMITED",
    "DUPLICATE_QUERY_SUBMISSION"
  ].includes(value);
}

function parseErrorInfo(value: unknown): QueryErrorInfo {
  if (!isRecord(value)) {
    throw new Error("Invalid 'error': expected object.");
  }

  const codeCandidate = asNonEmptyString(value.code, "error.code");
  if (!isQueryErrorCode(codeCandidate)) {
    throw new Error("Invalid 'error.code': unsupported value.");
  }

  let details: string[] | undefined;
  if (value.details !== undefined) {
    if (!Array.isArray(value.details)) {
      throw new Error("Invalid 'error.details': expected array of strings.");
    }

    details = value.details.map((item, index) =>
      asNonEmptyString(item, `error.details[${index}]`)
    );
  }

  return {
    code: codeCandidate,
    message: asNonEmptyString(value.message, "error.message"),
    details
  };
}

function parseResultStatus(value: unknown): QueryResultStatus {
  const status = asNonEmptyString(value, "resultStatus");
  if (!isQueryResultStatus(status)) {
    throw new Error(`Invalid 'resultStatus': ${status}`);
  }

  return status;
}

function parseSuccessResponse(root: Record<string, unknown>, status: QuerySuccessStatus): QuerySuccessResponse {
  const jurisdiction = asNullableString(root.jurisdiction, "jurisdiction");
  const sourcesUsed = asInteger(root.sourcesUsed, "sourcesUsed");

  return {
    resultStatus: status,
    queryId: asNonEmptyString(root.queryId, "queryId"),
    jurisdiction,
    answer: parseAnswer(root.answer),
    citations: parseCitations(root.citations),
    sourcesUsed,
    trace: parseTrace(root.trace, {
      resultStatus: status,
      jurisdiction,
      sourcesUsed
    })
  };
}

function parseErrorResponse(root: Record<string, unknown>, status: QueryErrorStatus): QueryErrorResponse {
  if (root.queryId !== null) {
    throw new Error("Invalid 'queryId': expected null for error responses.");
  }

  const sourcesUsed = asInteger(root.sourcesUsed, "sourcesUsed");
  if (sourcesUsed !== 0) {
    throw new Error("Invalid 'sourcesUsed': expected 0 for error responses.");
  }

  return {
    resultStatus: status,
    queryId: null,
    jurisdiction: asNullableString(root.jurisdiction, "jurisdiction"),
    answer: parseAnswer(root.answer),
    citations: parseCitations(root.citations),
    sourcesUsed: 0,
    error: parseErrorInfo(root.error)
  };
}

export function mapQueryResponse(value: unknown): QueryResponse {
  if (!isRecord(value)) {
    throw new Error("Invalid query response payload: expected object.");
  }

  const status = parseResultStatus(value.resultStatus);
  if (isQuerySuccessStatus(status)) {
    return parseSuccessResponse(value, status);
  }

  if (isQueryErrorStatus(status)) {
    return parseErrorResponse(value, status);
  }

  throw new Error(`Unsupported query status: ${status}`);
}

export function coercePartialSuccessResponse(value: unknown): QuerySuccessResponse | null {
  if (!isRecord(value)) {
    return null;
  }

  const resultStatus = asOptionalString(value.resultStatus);
  if (resultStatus !== "partial") {
    return null;
  }

  const citations = coerceCitationsForPartialFallback(value.citations);
  const parsedSourcesUsed = asOptionalNonNegativeInteger(value.sourcesUsed);

  return {
    resultStatus: "partial",
    queryId: asOptionalString(value.queryId) ?? `partial-fallback-${Date.now()}`,
    jurisdiction: asOptionalNullableString(value.jurisdiction) ?? null,
    answer: coerceAnswerForPartialFallback(value.answer),
    citations,
    sourcesUsed: parsedSourcesUsed ?? citations.length,
    trace: parseTrace(value.trace, {
      resultStatus: "partial",
      jurisdiction: asOptionalNullableString(value.jurisdiction) ?? null,
      sourcesUsed: parsedSourcesUsed ?? citations.length
    })
  };
}
