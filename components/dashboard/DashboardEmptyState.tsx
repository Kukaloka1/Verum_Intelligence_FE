export function DashboardEmptyState() {
  return (
    <div className="flex min-h-[320px] w-full flex-col items-center justify-center rounded-3xl border border-border bg-panel/20 px-6 py-12 text-center">
      <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted">
        No Updates Available
      </div>

      <p className="mx-auto max-w-2xl text-sm leading-relaxed text-foreground">
        There are no regulatory developments for the selected filters yet. Try expanding the
        date range or jurisdiction scope.
      </p>
    </div>
  );
}