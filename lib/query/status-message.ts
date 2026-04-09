import type { QueryResponse } from "../../types/query";

export function resolveQueryStatusMessage(response: QueryResponse | null): string | null {
  if (!response) {
    return null;
  }

  if (response.resultStatus === "rate_limited") {
    return response.error.code === "DUPLICATE_QUERY_SUBMISSION"
      ? "What happened: duplicate submission was blocked. Why: the same query was sent within the short dedup window. What to do next: wait a few seconds and submit once."
      : "What happened: submission was throttled. Why: request volume exceeded the current limit window. What to do next: wait briefly and retry.";
  }

  if (response.resultStatus === "validation_error") {
    return "What happened: the request was not accepted. Why: input did not pass validation rules. What to do next: adjust query text or jurisdiction and submit again.";
  }

  if (response.resultStatus === "system_error") {
    return "What happened: the request could not be completed. Why: a temporary service issue interrupted execution. What to do next: retry shortly.";
  }

  if (response.resultStatus === "no_results") {
    return "What happened: no grounded result was found. Why: current scope did not match enough stored regulatory evidence. What to do next: rephrase the question or broaden jurisdiction scope.";
  }

  if (response.resultStatus === "partial") {
    return "What happened: a partial grounded result was returned. Why: only limited source support was available for part of the request. What to do next: narrow the question and verify with citations.";
  }

  return "Grounded query completed successfully.";
}
