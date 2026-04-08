export function DashboardFilters() {
  const filters = ["All jurisdictions", "Last 7 days", "Alerts only", "Official notices"];

  return (
    <div className="rounded-2xl border border-border bg-panel p-4">
      <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
        Filters
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-panel2"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
