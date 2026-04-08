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
  return {
    resultStatus: status,
    queryId: asNonEmptyString(root.queryId, "queryId"),
    jurisdiction: asNullableString(root.jurisdiction, "jurisdiction"),
    answer: parseAnswer(root.answer),
    citations: parseCitations(root.citations),
    sourcesUsed: asInteger(root.sourcesUsed, "sourcesUsed")
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

