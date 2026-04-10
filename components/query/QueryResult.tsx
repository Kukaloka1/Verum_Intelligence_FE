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
import { QueryTracePanel } from "./QueryTracePanel";

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

function isTraceRenderableResponse(response: QueryResponse): response is QuerySuccessResponse {
  return (
    response.resultStatus === "success" ||
    response.resultStatus === "partial" ||
    response.resultStatus === "no_results"
  );
}

function viewStateLabel(viewState: QueryViewState) {
  return viewState.replace("_", " ").toUpperCase();
}

function panelStatusTone(viewState: QueryViewState) {
  if (viewState === "success") {
    return "success";
  }

  if (viewState === "partial") {
    return "partial";
  }

  if (viewState === "no_results") {
    return "neutral";
  }

  if (viewState === "validation_error" || viewState === "system_error" || viewState === "rate_limited") {
    return "warning";
  }

  return "neutral";
}

export function QueryResult({
  viewState,
  response,
  statusMessage,
  jurisdictionSelection,
  onReset
}: QueryResultProps) {
  const resolvedJurisdiction = response?.jurisdiction ?? jurisdictionSelection ?? "All";
  const tone = panelStatusTone(viewState);
  const coverageScope =
    response && isRenderableSuccess(response)
      ? response.answer.limitations ??
        (response.resultStatus === "partial"
          ? "A partial answer was produced with limited evidence support."
          : "Grounded support was found for this answer. Coverage remains bounded to the cited records retrieved for this run.")
      : undefined;
  const coverageReason =
    response && isRenderableSuccess(response)
      ? response.resultStatus === "partial"
        ? "The retrieval layer found only a narrow set of supporting records for part of the request."
        : response.answer.limitations
          ? "Grounded support exists, but the answer scope is bounded to the retrieved evidence set for this run."
          : "No major coverage risk was detected in this run, but synthesis remains constrained to the retrieved cited sources."
      : undefined;
  const coverageNextStep =
    response && isRenderableSuccess(response)
      ? response.resultStatus === "partial"
        ? "Narrow the question to one obligation or topic, or rerun with adjusted jurisdiction and verify against the cited record set."
        : response.answer.limitations
          ? "Review the cited sources and run a focused follow-up question on specific obligations, thresholds, or timelines."
          : "Use the citations to validate key points, then run one targeted follow-up question to deepen a specific obligation, threshold, or timeline."
      : undefined;

  return (
    <div className="flex h-full w-full flex-col gap-8 px-2.5 py-4 md:gap-10 md:p-8 lg:p-10">
      <header
        className={cn(
          "rounded-[28px] border px-5 py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] md:px-7 md:py-7",
          tone === "success" && "border-emerald-500/20 bg-background/85",
          tone === "partial" && "border-amber-500/20 bg-background/85",
          tone === "warning" && "border-amber-500/15 bg-background/85",
          tone === "neutral" && "border-border bg-background/80"
        )}
      >
        <div className="space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-accent" />
                <h3 className="text-[11px] font-bold uppercase tracking-[0.34em] text-accent">
                  Intelligence Panel
                </h3>
              </div>

              <p className="max-w-[72ch] text-sm leading-relaxed text-muted/90 md:text-[1.02rem]">
                Structured output grounded in vector retrieval, exact matching, and cited
                regulatory sources.
              </p>
            </div>

            <span
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em]",
                viewState === "success" &&
                  "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                viewState === "partial" &&
                  "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
                viewState !== "success" &&
                  viewState !== "partial" &&
                  "border-border bg-panel text-muted"
              )}
            >
              {viewStateLabel(viewState)}
            </span>
          </div>

          <div className="grid gap-4 border-t border-border/40 pt-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div className="space-y-1">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted/85">
                Jurisdiction
              </div>
              <div className="text-base font-medium leading-tight text-foreground md:text-[1.05rem]">
                {resolvedJurisdiction}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted/85">
                Query ID
              </div>
              <div className="break-all text-sm leading-relaxed text-foreground/85 md:text-[0.98rem]">
                {response?.queryId ?? "n/a"}
              </div>
            </div>
          </div>

          {statusMessage ? (
            <div className="border-t border-border/30 pt-4">
              <p className="max-w-[76ch] text-base leading-relaxed text-foreground/90 md:text-[1.08rem]">
                {statusMessage}
              </p>
            </div>
          ) : null}
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-8 md:gap-10">
        {response && isTraceRenderableResponse(response) ? <QueryTracePanel response={response} /> : null}

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
          <section className="flex flex-col gap-8 rounded-[28px] border border-border bg-background/85 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm md:gap-10 md:p-7">
            <QuerySummary summary={response.answer.summary} status={response.resultStatus} />

            <div className="h-px w-full bg-border/35" />

            <QueryStructuredBody sections={response.answer.body} />

            <div className="border-t border-border/30 pt-5">
              <QueryLimitations
                limitations={coverageScope ?? "Coverage is bounded to retrieved cited material."}
                reason={coverageReason ?? "No additional reason reported for this run."}
                nextStep={coverageNextStep ?? "Review citations and refine the question."}
              />
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
