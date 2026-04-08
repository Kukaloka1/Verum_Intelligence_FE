import { apiFetch } from "@/lib/api/client";
import { mapQueryResponse } from "@/lib/mappers/query";
import type { QueryRequestBody, QueryRequestResult } from "@/types/query";

const QUERY_ENDPOINT_PATH = "/v1/query";

export async function postQueryRequest(input: QueryRequestBody): Promise<QueryRequestResult> {
  const response = await apiFetch(QUERY_ENDPOINT_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    cache: "no-store",
    body: JSON.stringify(input)
  });

  const rawBody = await response.text();
  if (!rawBody) {
    throw new Error(`Query API returned an empty response body (HTTP ${response.status}).`);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    throw new Error(`Query API returned invalid JSON (HTTP ${response.status}).`);
  }

  return {
    httpStatus: response.status,
    payload: mapQueryResponse(payload)
  };
}
