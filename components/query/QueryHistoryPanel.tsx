import { Button } from "@/components/shared/Button";
import type { QueryHistoryEntry } from "@/types/query";

interface QueryHistoryPanelProps {
  entries: QueryHistoryEntry[];
  onUseEntry: (entry: QueryHistoryEntry) => void;
}

function formatStatusLabel(status: QueryHistoryEntry["resultStatus"]) {
  return status.replace("_", " ").toUpperCase();
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

export function QueryHistoryPanel({ entries, onUseEntry }: QueryHistoryPanelProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
          Session Query History
        </h3>
        <p className="mt-1 text-sm text-foreground/80">
          Local session log of recent query submissions and backend outcomes.
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-border bg-background p-4 text-sm text-muted">
          No submitted queries in this browser session yet.
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-2xl border border-border bg-background p-3 md:p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="rounded-full border border-border bg-panel px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-muted">
                  {formatStatusLabel(entry.resultStatus)}
                </div>
                <div className="text-xs text-muted">{formatTimestamp(entry.createdAt)}</div>
              </div>

              <p className="mt-2 text-sm text-foreground">{entry.query}</p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
                <span>Jurisdiction: {entry.jurisdiction ?? "All"}</span>
                <span>Query ID: {entry.queryId ?? "n/a"}</span>
              </div>

              <Button
                type="button"
                className="mt-3 !border-border !bg-panel2/40 !text-foreground hover:!bg-panel2/70"
                onClick={() => onUseEntry(entry)}
              >
                Use in Input
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
