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
    <section className="flex h-full flex-col">
      <div className="mb-8 space-y-1.5">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Traceability
        </div>
        <p className="max-w-[30ch] text-xs leading-relaxed text-muted/70">
          Source density returned by the backend retrieval layer for this result.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex items-baseline gap-4">
          <span className="text-7xl font-bold leading-none tracking-tighter tabular-nums text-foreground">
            {sourcesUsed}
          </span>

          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
              Sources used
            </span>
            <span className="text-sm font-semibold text-foreground/80">
              Retrieval support
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-border/60 pt-7">
          <div className="flex flex-col gap-1.5">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                sourcesUsed >= 5 ? "text-emerald-600/90" : "text-amber-600/90"
              }`}
            >
              {sourceSupportLabel(sourcesUsed)}
            </p>

            <div className="flex items-center gap-2 text-xs text-muted">
              <span>Jurisdiction:</span>
              <span className="font-medium text-foreground/70">{jurisdiction ?? "All"}</span>
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