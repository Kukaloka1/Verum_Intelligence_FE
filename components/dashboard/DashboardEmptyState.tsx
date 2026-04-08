export function DashboardEmptyState() {
  return (
    <div className="rounded-3xl border border-border bg-panel p-8 text-center">
      <div className="text-sm font-semibold uppercase tracking-widest text-muted">
        No Updates Available
      </div>
      <p className="mx-auto mt-3 max-w-2xl text-sm text-foreground">
        There are no regulatory developments for the selected filters yet. Try expanding the
        date range or jurisdiction scope.
      </p>
    </div>
  );
}
