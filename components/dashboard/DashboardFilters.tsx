export function DashboardFilters() {
  const filters = ["All jurisdictions", "Last 7 days", "Alerts only", "Official notices"];

  return (
    <div className="flex w-full flex-col gap-4 pb-6">
      <div className="flex items-center gap-4">
        <div className="text-xs font-semibold uppercase tracking-widest text-muted">
          Filters
        </div>
        <div className="h-px flex-1 bg-border/40" />
      </div>

      <div className="flex flex-wrap gap-2.5">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-background/40 px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-border hover:bg-panel2"
          >
            <div className="absolute left-0 top-0 h-full w-[2px] bg-foreground/0 transition-colors group-hover:bg-foreground/30" />
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}