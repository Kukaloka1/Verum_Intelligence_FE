export function DashboardErrorState() {
  return (
    <div className="relative flex min-h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-accent/20 bg-accent/[0.03] px-6 py-12 text-center">
      <div className="absolute left-0 top-0 h-px w-full bg-accent/60" />

      <div className="mb-5 flex items-center justify-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10">
          <span className="h-1 w-5 rounded-full bg-accent/80" />
        </div>
      </div>

      <div className="text-sm font-semibold uppercase tracking-widest text-accent">
        Failed to Load Dashboard
      </div>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-foreground">
        We could not retrieve the latest monitoring data. Retry when the connection is stable.
      </p>

      <button
        type="button"
        className="mt-6 rounded-xl border border-accent/35 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
      >
        Retry
      </button>
    </div>
  );
}
