import { apiFetch } from "@/lib/api/client";
import { coercePartialSuccessResponse, mapQueryResponse } from "@/lib/mappers/query";
import type { QueryRequestBody, QueryRequestResult } from "@/types/query";

const QUERY_ENDPOINT_PATH = "/v1/query";

interface PostQueryRequestOptions {
  signal?: AbortSignal;
}

export async function postQueryRequest(
  input: QueryRequestBody,
  options: PostQueryRequestOptions = {}
): Promise<QueryRequestResult> {
  const response = await apiFetch(QUERY_ENDPOINT_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    cache: "no-store",
    signal: options.signal,
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

  try {
    return {
      httpStatus: response.status,
      payload: mapQueryResponse(payload)
    };
  } catch (error) {
    const partialFallback = coercePartialSuccessResponse(payload);
    if (response.status === 200 && partialFallback) {
      return {
        httpStatus: response.status,
        payload: partialFallback
      };
    }

    throw error;
  }
}
