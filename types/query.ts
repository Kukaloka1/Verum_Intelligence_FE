export const QUERY_SUCCESS_STATUSES = ["success", "partial", "no_results"] as const;
export const QUERY_ERROR_STATUSES = ["validation_error", "system_error", "rate_limited"] as const;
export const QUERY_RESULT_STATUSES = [...QUERY_SUCCESS_STATUSES, ...QUERY_ERROR_STATUSES] as const;

export const QUERY_ERROR_CODES = [
  "validation_error",
  "system_error",
  "RATE_LIMITED",
  "DUPLICATE_QUERY_SUBMISSION"
] as const;

export type QuerySuccessStatus = (typeof QUERY_SUCCESS_STATUSES)[number];
export type QueryErrorStatus = (typeof QUERY_ERROR_STATUSES)[number];
export type QueryResultStatus = (typeof QUERY_RESULT_STATUSES)[number];
export type QueryErrorCode = (typeof QUERY_ERROR_CODES)[number];

export type QueryViewState = QueryResultStatus | "idle" | "loading";

export interface QueryRequestBody {
  query: string;
  jurisdiction?: string | null;
  userId?: string | null;
  saveQuery?: boolean;
}

export interface QueryAnswerSection {
  sectionTitle: string;
  content: string;
}

export interface QueryAnswer {
  summary: string;
  body: QueryAnswerSection[];
  limitations?: string;
}

export interface QueryCitation {
  sourceName: string;
  documentTitle: string;
  publishedAt: string | null;
  sourceType: string | null;
  url: string | null;
}

export interface QueryErrorInfo {
  code: QueryErrorCode;
  message: string;
  details?: string[];
}

export interface QuerySuccessResponse {
  resultStatus: QuerySuccessStatus;
  queryId: string;
  jurisdiction: string | null;
  answer: QueryAnswer;
  citations: QueryCitation[];
  sourcesUsed: number;
}

export interface QueryErrorResponse {
  resultStatus: QueryErrorStatus;
  queryId: null;
  jurisdiction: string | null;
  answer: QueryAnswer;
  citations: QueryCitation[];
  sourcesUsed: 0;
  error: QueryErrorInfo;
}

export type QueryResponse = QuerySuccessResponse | QueryErrorResponse;

export interface QueryRequestResult {
  httpStatus: number;
  payload: QueryResponse;
}

export interface QueryHistoryEntry {
  id: string;
  queryId: string | null;
  query: string;
  jurisdiction: string | null;
  resultStatus: QueryResultStatus;
  createdAt: string;
}

