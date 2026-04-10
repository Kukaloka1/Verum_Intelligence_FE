import type { QuerySuccessResponse } from "@/types/query";
import { QueryTraceCard } from "./QueryTraceCard";

interface QueryTracePanelProps {
  response: QuerySuccessResponse;
}

function formatMatchValue(input: {
  matches: number | null;
  deferred: boolean | null;
}): string {
  if (input.deferred === true) {
    return "deferred";
  }

  if (typeof input.matches !== "number") {
    return "not reported";
  }

  return `${input.matches} ${input.matches === 1 ? "match" : "matches"}`;
}

function formatGroundedSourcesValue(count: number | null): string {
  if (typeof count !== "number") {
    return "not reported";
  }

  return `${count} ${count === 1 ? "source" : "sources"}`;
}

function formatSynthesisValue(response: QuerySuccessResponse): string {
  const status = response.trace.synthesis.status;
  if (status === "complete") {
    return "complete";
  }

  if (status === "partial") {
    return "partial";
  }

  if (status === "not_produced") {
    return "not produced";
  }

  return response.resultStatus === "success"
    ? "complete"
    : response.resultStatus === "partial"
      ? "partial"
      : "not produced";
}

function synthesisCardState(value: string): "neutral" | "positive" | "warning" {
  if (value === "complete") {
    return "positive";
  }

  if (value === "partial" || value === "not produced") {
    return "warning";
  }

  return "neutral";
}

function retrievalCardState(input: { deferred: boolean | null; matches: number | null }) {
  if (input.deferred === true) {
    return "warning" as const;
  }

  if (typeof input.matches === "number" && input.matches > 0) {
    return "positive" as const;
  }

  return "neutral" as const;
}

function formatEmbeddingLayerValue(response: QuerySuccessResponse): string {
  const layer = response.trace.embeddingLayer;

  if (layer.status === "ready") {
    if (typeof layer.dimension === "number") {
      return `${layer.dimension}-dim`;
    }

    return "ready";
  }

  if (layer.status === "mismatch") {
    return "mismatch";
  }

  if (layer.status === "deferred") {
    return "deferred";
  }

  return "not reported";
}

function embeddingLayerDescription(response: QuerySuccessResponse): string {
  const layer = response.trace.embeddingLayer;

  if (layer.status === "ready") {
    return "Semantic query vector generated and aligned for pgvector search.";
  }

  if (layer.status === "mismatch") {
    return "Embedding dimension mismatch detected during semantic retrieval.";
  }

  if (layer.status === "deferred") {
    return "Embedding generation was deferred or unavailable for this run.";
  }

  return "Embedding diagnostics were not reported for this run.";
}

function embeddingLayerState(response: QuerySuccessResponse): "neutral" | "positive" | "warning" {
  const status = response.trace.embeddingLayer.status;

  if (status === "ready") {
    return "positive";
  }

  if (status === "deferred" || status === "mismatch") {
    return "warning";
  }

  return "neutral";
}

export function QueryTracePanel({ response }: QueryTracePanelProps) {
  const synthesisValue = formatSynthesisValue(response);
  const scope = response.trace.scope.jurisdiction ?? response.jurisdiction ?? "All";

  return (
    <section className="space-y-5">
      <div className="space-y-1.5">
        <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
          Retrieval &amp; Grounding Trace
        </div>
        <p className="max-w-[78ch] text-xs leading-relaxed text-muted/80">
          Runtime trace for how this answer was produced across retrieval, grounding, and synthesis.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <QueryTraceCard
          label="Vector Retrieval"
          value={formatMatchValue({
            matches: response.trace.vectorRetrieval.matches,
            deferred: response.trace.vectorRetrieval.deferred
          })}
          description="Semantic nearest-neighbor matches from pgvector."
          valueVariant="metric_compact"
          state={retrievalCardState({
            deferred: response.trace.vectorRetrieval.deferred,
            matches: response.trace.vectorRetrieval.matches
          })}
        />

        <QueryTraceCard
          label="Keyword Retrieval"
          value={formatMatchValue({
            matches: response.trace.keywordRetrieval.matches,
            deferred: response.trace.keywordRetrieval.deferred
          })}
          description="Exact and high-signal legal term matching."
          valueVariant="metric_compact"
          state={retrievalCardState({
            deferred: response.trace.keywordRetrieval.deferred,
            matches: response.trace.keywordRetrieval.matches
          })}
        />

        <QueryTraceCard
          label="Embedding Layer"
          value={formatEmbeddingLayerValue(response)}
          description={embeddingLayerDescription(response)}
          state={embeddingLayerState(response)}
        />

        <QueryTraceCard
          label="Grounded Sources"
          value={formatGroundedSourcesValue(response.trace.groundedSources)}
          description="Cited documents supporting the final answer."
          state={
            typeof response.trace.groundedSources === "number" && response.trace.groundedSources > 0
              ? "positive"
              : "neutral"
          }
        />

        <QueryTraceCard
          label="Synthesis"
          value={synthesisValue}
          description="Final structured generation status."
          state={synthesisCardState(synthesisValue)}
        />

        <QueryTraceCard
          label="Scope"
          value={scope}
          description="Jurisdiction applied to this run."
          state="neutral"
        />
      </div>
    </section>
  );
}
