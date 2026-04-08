export function DashboardErrorState() {
  return (
    <div className="rounded-3xl border border-accent/30 bg-panel p-8 text-center">
      <div className="text-sm font-semibold uppercase tracking-widest text-accent">
        Failed to Load Dashboard
      </div>
      <p className="mx-auto mt-3 max-w-2xl text-sm text-foreground">
        We could not retrieve the latest monitoring data. Retry when the connection is stable.
      </p>
      <button
        type="button"
        className="mt-5 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Retry
      </button>
    </div>
  );
}
