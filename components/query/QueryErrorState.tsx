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

export function QueryErrorState({
  status,
  code,
  message,
  limitations,
  details = [],
  onReset
}: QueryErrorStateProps) {
  return (
    <section className="rounded-2xl border border-accent/35 bg-accent/10 p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        {TITLE_BY_STATUS[status]}
      </div>
      <p className="mt-2 text-sm text-foreground">{message}</p>
      {code ? (
        <p className="mt-1 text-xs font-medium tracking-wide text-muted">Code: {code}</p>
      ) : null}

      {limitations ? <p className="mt-2 text-sm text-muted">{limitations}</p> : null}

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

