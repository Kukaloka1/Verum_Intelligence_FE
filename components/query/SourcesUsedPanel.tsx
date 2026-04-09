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
    <section className="rounded-2xl border border-border bg-background p-4 md:p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        Traceability
      </div>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-3xl font-semibold text-foreground">{sourcesUsed}</p>
          <p className="text-xs uppercase tracking-[0.12em] text-muted">Sources used</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/90">
            {sourceSupportLabel(sourcesUsed)}
          </p>
          <p className="text-xs text-muted">Jurisdiction: {jurisdiction ?? "All"}</p>
        </div>
      </div>
    </section>
  );
}
