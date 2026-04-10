import { cn } from "@/lib/utils/cn";
import type {
  QueryErrorResponse,
  QueryResponse,
  QuerySuccessResponse,
  QueryViewState
} from "@/types/query";
import { QueryEmptyState } from "./QueryEmptyState";
import { QueryErrorState } from "./QueryErrorState";
import { QueryLimitations } from "./QueryLimitations";
import { QueryStructuredBody } from "./QueryStructuredBody";
import { QuerySummary } from "./QuerySummary";

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
    <div className="flex h-full w-full flex-col gap-8 px-2.5 py-4 md:gap-12 md:p-8 lg:p-10">
      <header className="flex flex-col gap-4 px-1 py-1 md:rounded-2xl md:border md:border-border md:bg-background/80 md:p-5">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
            Query Result
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
            <span className="break-words">{`Jurisdiction: ${resolvedJurisdiction}`}</span>
            {response ? <span className="break-all">{`Query ID: ${response.queryId ?? "n/a"}`}</span> : null}
          </div>

          <span
            className={cn(
              "rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em]",
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

        {statusMessage ? (
          <p className="mt-2 max-w-none break-words text-sm leading-relaxed text-foreground/85 md:max-w-[74ch]">
            {statusMessage}
          </p>
        ) : null}
      </header>

      <div className="flex flex-1 flex-col gap-8 md:gap-12">
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
          <QueryEmptyState
            mode="no_results"
            summary={response.answer.summary}
            limitations={response.answer.limitations}
          />
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
          <section className="flex flex-col gap-8 p-0 md:rounded-2xl md:border md:border-border md:bg-background/85 md:p-6 md:backdrop-blur-sm">
            <QuerySummary summary={response.answer.summary} status={response.resultStatus} />

            <div className="h-px w-full bg-border/40" />

            <QueryStructuredBody sections={response.answer.body} />

            {response.resultStatus === "partial" || response.answer.limitations ? (
              <div className="border-t border-border/30 pt-4">
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
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    </div>
  );
}