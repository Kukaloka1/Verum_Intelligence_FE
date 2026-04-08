export function JurisdictionPanel() {
  return (
    <div className="rounded-3xl border border-border bg-panel p-6">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">
        Jurisdiction Panel
      </div>
      <h3 className="text-xl font-semibold text-foreground">DIFC</h3>
      <p className="mt-2 text-sm text-muted">
        Panel placeholder for regulator activity, latest updates, and quick actions.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-background p-3">
          <div className="text-xs uppercase tracking-wide text-muted">Recent updates</div>
          <div className="mt-1 text-lg font-semibold text-foreground">6</div>
        </div>
        <div className="rounded-xl border border-border bg-background p-3">
          <div className="text-xs uppercase tracking-wide text-muted">Active alerts</div>
          <div className="mt-1 text-lg font-semibold text-accent">2</div>
        </div>
        <div className="rounded-xl border border-border bg-background p-3">
          <div className="text-xs uppercase tracking-wide text-muted">Last refresh</div>
          <div className="mt-1 text-lg font-semibold text-foreground">11:15</div>
        </div>
      </div>
    </div>
  );
}
