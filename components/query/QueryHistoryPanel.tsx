import { Button } from "@/components/shared/Button";
import type { QueryHistoryEntry } from "@/types/query";

interface QueryHistoryPanelProps {
  entries: QueryHistoryEntry[];
  onUseEntry: (entry: QueryHistoryEntry) => void;
  onDeleteEntry: (entryId: string) => void;
}

function formatStatusLabel(status: QueryHistoryEntry["resultStatus"]) {
  return status.replace("_", " ").toUpperCase();
}

function historyStatusTone(status: QueryHistoryEntry["resultStatus"]) {
  if (status === "success") {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700";
  }

  if (status === "partial") {
    return "border-amber-500/30 bg-amber-500/10 text-amber-700";
  }

  if (status === "no_results") {
    return "border-slate-500/25 bg-slate-500/10 text-slate-700";
  }

  return "border-accent/30 bg-accent/10 text-accent";
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

function displayQueryIdentifier(entry: QueryHistoryEntry) {
  if (entry.queryId) {
    return entry.queryId.slice(0, 8);
  }

  return entry.id.slice(-8);
}

export function QueryHistoryPanel({ entries, onUseEntry, onDeleteEntry }: QueryHistoryPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
          Session Query History
        </h3>
        <p className="mt-1 text-xs text-muted">
          {entries.length} entr{entries.length === 1 ? "y" : "ies"}
        </p>
      </div>
      <p className="text-sm text-foreground/80">
          Local session log of recent query submissions and backend outcomes.
      </p>

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-border bg-background p-4 text-sm text-muted">
          No submitted queries in this browser session yet.
        </div>
      ) : (
        <div className="max-h-[26rem] space-y-3 overflow-y-auto pr-1">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-2xl border border-border bg-background p-3.5 md:p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] ${historyStatusTone(
                    entry.resultStatus
                  )}`}
                >
                  {formatStatusLabel(entry.resultStatus)}
                </div>
                <div className="text-xs text-muted">{formatTimestamp(entry.createdAt)}</div>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-foreground/95">{entry.query}</p>

              <div className="mt-2 grid gap-1.5 text-xs text-muted sm:grid-cols-2">
                <span>Jurisdiction: {entry.jurisdiction ?? "All"}</span>
                <span className="sm:text-right">Ref: {displayQueryIdentifier(entry)}</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  className="!border-border !bg-panel2/40 !text-foreground hover:!bg-panel2/70"
                  onClick={() => onUseEntry(entry)}
                >
                  Use in Input
                </Button>
                <Button
                  type="button"
                  className="!border-border !bg-background !text-muted hover:!bg-panel2/40 hover:!text-foreground"
                  onClick={() => onDeleteEntry(entry.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
