interface SourcesUsedPanelProps {
  sourcesUsed: number;
  jurisdiction: string | null;
}

function sourceSupportLabel(sourcesUsed: number) {
  if (sourcesUsed === 0) {
    return "No supporting sources";
  }

  if (sourcesUsed < 2) {
    return "Limited supporting sources";
  }

  if (sourcesUsed < 5) {
    return "Moderate supporting sources";
  }

  return "Strong supporting sources";
}

export function SourcesUsedPanel({ sourcesUsed, jurisdiction }: SourcesUsedPanelProps) {
  return (
    <section className="flex h-full min-w-0 flex-col gap-8 lg:gap-10">
      <div className="space-y-1.5">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Traceability
        </div>
        <p className="max-w-[30ch] text-xs leading-relaxed text-muted/70 lg:max-w-[34ch]">
          Source density returned by the backend retrieval layer for this result.
        </p>
      </div>

      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-10">
        <div className="flex min-w-0 items-end gap-4">
          <span className="shrink-0 text-7xl font-bold leading-none tracking-tighter tabular-nums text-foreground lg:text-[5rem]">
            {sourcesUsed}
          </span>

          <div className="min-w-0 flex flex-col gap-0.5 pb-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
              Sources used
            </span>
            <span className="text-sm font-semibold text-foreground/80">
              Retrieval support
            </span>
          </div>
        </div>

        <div className="min-w-0 flex flex-col gap-5">
          <div className="flex min-w-0 flex-col gap-1.5">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                sourcesUsed >= 5 ? "text-emerald-600/90" : "text-amber-600/90"
              }`}
            >
              {sourceSupportLabel(sourcesUsed)}
            </p>

            <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
              <span className="shrink-0">Jurisdiction:</span>
              <span className="min-w-0 break-words font-medium text-foreground/70">
                {jurisdiction ?? "All"}
              </span>
            </div>
          </div>

          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted/10">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                sourcesUsed >= 5 ? "bg-emerald-500/40" : "bg-amber-500/40"
              }`}
              style={{ width: `${Math.min((sourcesUsed / 10) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}