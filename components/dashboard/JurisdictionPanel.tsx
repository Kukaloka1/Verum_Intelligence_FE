export function JurisdictionPanel() {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border/30 bg-panel/10 p-6 md:p-8 transition-colors duration-200 hover:bg-panel/20">
      <div className="absolute left-0 top-0 h-full w-px bg-accent/0 transition-colors group-hover:bg-accent/40" />

      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted">
            Jurisdiction Panel
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            DIFC
          </h3>
        </div>
      </div>

      <p className="max-w-[62ch] text-sm leading-relaxed text-muted">
        Panel placeholder for regulator activity, latest updates, and quick actions.
      </p>

      <div className="mt-8 grid gap-3 border-t border-border/20 pt-6 sm:grid-cols-3 md:gap-4">
        <div className="flex flex-col gap-1">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            Recent updates
          </div>
          <div className="text-xl font-semibold tracking-tight tabular-nums text-foreground">
            6
          </div>
        </div>

        <div className="flex flex-col gap-1 sm:border-x sm:border-border/20 sm:px-4 md:px-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            Active alerts
          </div>
          <div className="text-xl font-semibold tracking-tight tabular-nums text-accent">
            2
          </div>
        </div>

        <div className="flex flex-col gap-1 sm:pl-4 md:pl-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            Last refresh
          </div>
          <div className="text-xl font-semibold tracking-tight tabular-nums text-foreground">
            11:15
          </div>
        </div>
      </div>
    </div>
  );
}