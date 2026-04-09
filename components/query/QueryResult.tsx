import { cn } from "@/lib/utils/cn";
import type {
  QueryErrorResponse,
  QueryResponse,
  QuerySuccessResponse,
  QueryViewState
} from "@/types/query";
import { CitationList } from "./CitationList";
import { QueryEmptyState } from "./QueryEmptyState";
import { QueryErrorState } from "./QueryErrorState";
import { QueryLimitations } from "./QueryLimitations";
import { QueryStructuredBody } from "./QueryStructuredBody";
import { QuerySummary } from "./QuerySummary";
import { SourcesUsedPanel } from "./SourcesUsedPanel";

interface QueryResultProps {
  viewState: QueryViewState;
  response: QueryResponse | null;
  statusMessage: string | null;
  jurisdictionSelection: string | null;
  onReset: () => void;
}

function isErrorResponse(response: QueryResponse): response is QueryErrorResponse {
  return (
    response.resultStatus === "validation_error" ||
    response.resultStatus === "system_error" ||
    response.resultStatus === "rate_limited"
  );
}

function isRenderableSuccess(
  response: QueryResponse
): response is QuerySuccessResponse & { resultStatus: "success" | "partial" } {
  return response.resultStatus === "success" || response.resultStatus === "partial";
}

function viewStateLabel(viewState: QueryViewState) {
  return viewState.replace("_", " ").toUpperCase();
}

export function QueryResult({
  viewState,
  response,
  statusMessage,
  jurisdictionSelection,
  onReset
}: QueryResultProps) {
  const resolvedJurisdiction = response?.jurisdiction ?? jurisdictionSelection ?? "All";

  return (
    <div className="space-y-5 md:space-y-6">
      <header className="rounded-2xl border border-border bg-background p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            Query Result
          </h3>
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em]",
              viewState === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                : viewState === "partial"
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-700"
                  : "border-border bg-panel text-muted"
            )}
          >
            {viewStateLabel(viewState)}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          <span>Jurisdiction: {resolvedJurisdiction}</span>
          {response ? <span>Query ID: {response.queryId ?? "n/a"}</span> : null}
        </div>

        {statusMessage ? (
          <p className="mt-3 max-w-[74ch] text-sm leading-relaxed text-foreground/85">{statusMessage}</p>
        ) : null}
      </header>

      {viewState === "idle" ? <QueryEmptyState mode="idle" /> : null}
      {viewState === "loading" ? <QueryEmptyState mode="loading" /> : null}

      {viewState !== "idle" && viewState !== "loading" && !response ? (
        <QueryErrorState
          status="system_error"
          message="No backend response payload was available."
          limitations="The frontend query flow ended in a non-idle state without a response."
          onReset={onReset}
        />
      ) : null}

      {response && response.resultStatus === "no_results" ? (
        <div className="space-y-4">
          <QueryEmptyState
            mode="no_results"
            summary={response.answer.summary}
            limitations={response.answer.limitations}
          />
          <div className="grid gap-3 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <SourcesUsedPanel
              sourcesUsed={response.sourcesUsed}
              jurisdiction={response.jurisdiction}
            />
            <CitationList citations={response.citations} />
          </div>
        </div>
      ) : null}

      {response && isErrorResponse(response) ? (
        <QueryErrorState
          status={response.resultStatus}
          code={response.error.code}
          message={response.error.message}
          limitations={response.answer.limitations}
          details={response.error.details}
          onReset={onReset}
        />
      ) : null}

      {response && isRenderableSuccess(response) ? (
        <div className="space-y-4">
          <section className="space-y-5 rounded-2xl border border-border bg-background p-4 md:p-5">
            <QuerySummary summary={response.answer.summary} status={response.resultStatus} />
            <div className="h-px bg-border" />
            <QueryStructuredBody sections={response.answer.body} />

            {response.resultStatus === "partial" || response.answer.limitations ? (
              <QueryLimitations
                limitations={
                  response.answer.limitations ??
                  "A partial answer was produced with limited evidence support."
                }
                reason={
                  response.resultStatus === "partial"
                    ? "The retrieval layer found only a narrow set of supporting records for part of the request."
                    : undefined
                }
                nextStep={
                  response.resultStatus === "partial"
                    ? "Narrow the question to one obligation/topic, or rerun with adjusted jurisdiction and verify against citations."
                    : undefined
                }
              />
            ) : null}
          </section>

          <div className="grid gap-3 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <SourcesUsedPanel
              sourcesUsed={response.sourcesUsed}
              jurisdiction={response.jurisdiction}
            />
            <CitationList citations={response.citations} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
