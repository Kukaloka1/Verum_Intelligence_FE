import { Button } from "@/components/shared/Button";
import type { QueryErrorCode, QueryErrorStatus } from "@/types/query";

interface QueryErrorStateProps {
  status: QueryErrorStatus;
  code?: QueryErrorCode;
  message: string;
  limitations?: string;
  details?: string[];
  onReset?: () => void;
}

const TITLE_BY_STATUS: Record<QueryErrorStatus, string> = {
  rate_limited: "Query throttled",
  validation_error: "Invalid query request",
  system_error: "System failure"
};

const WHY_BY_STATUS: Record<QueryErrorStatus, string> = {
  rate_limited: "Request protection limits were reached for this actor window.",
  validation_error: "The request content did not pass required validation checks.",
  system_error: "A temporary service issue interrupted completion of this request."
};

const NEXT_BY_STATUS: Record<QueryErrorStatus, string> = {
  rate_limited: "Wait briefly, then submit once.",
  validation_error: "Adjust query text or jurisdiction scope and submit again.",
  system_error: "Retry shortly. If it persists, simplify the question and retry."
};

const NEXT_BY_CODE: Partial<Record<QueryErrorCode, string>> = {
  DUPLICATE_QUERY_SUBMISSION: "Wait a few seconds and submit once.",
  RATE_LIMITED: "Pause briefly, then retry the request."
};

export function QueryErrorState({
  status,
  code,
  message,
  limitations,
  details = [],
  onReset
}: QueryErrorStateProps) {
  const whatHappened = message;
  const whyItHappened = limitations ?? WHY_BY_STATUS[status];
  const nextStep = (code ? NEXT_BY_CODE[code] : undefined) ?? NEXT_BY_STATUS[status];

  return (
    <section className="rounded-2xl border border-accent/35 bg-accent/10 p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        {TITLE_BY_STATUS[status]}
      </div>
      <p className="mt-2 text-sm text-foreground">
        <span className="font-semibold">What happened:</span> {whatHappened}
      </p>
      <p className="mt-1 text-sm text-foreground">
        <span className="font-semibold">Why:</span> {whyItHappened}
      </p>
      <p className="mt-1 text-sm text-foreground">
        <span className="font-semibold">What to do next:</span> {nextStep}
      </p>

      {code ? (
        <p className="mt-1 text-xs font-medium tracking-wide text-muted">Code: {code}</p>
      ) : null}

      {details.length > 0 ? (
        <ul className="mt-3 space-y-1 text-sm text-foreground/90">
          {details.map((detail) => (
            <li key={detail} className="list-inside list-disc">
              {detail}
            </li>
          ))}
        </ul>
      ) : null}

      {onReset ? (
        <Button
          type="button"
          className="mt-4 border-border bg-background text-foreground hover:bg-panel2/50"
          onClick={onReset}
        >
          Dismiss
        </Button>
      ) : null}
    </section>
  );
}
