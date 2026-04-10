export function ComparisonErrorState() {
  return (
    <div className="flex min-h-[450px] w-full flex-col items-center justify-center rounded-3xl border border-accent/20 bg-accent/[0.02] p-12 text-center">
      <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-xl border border-accent/25 bg-background">
        <span className="text-2xl font-black text-accent">!</span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">
          System_Alert // Matrix_Conflict
        </div>
        <h3 className="text-xl font-bold tracking-tight text-foreground">
          Matrix Synchronization Failed
        </h3>
        <p className="mx-auto mt-2 max-w-[40ch] text-sm italic leading-relaxed text-muted/60">
          We encountered an anomaly in the cross-reference engine. The data stream has been
          interrupted to prevent corruption.
        </p>
      </div>

      <button className="mt-10 flex items-center gap-4 rounded-lg border border-accent/40 bg-accent/10 px-8 py-3 text-[11px] font-black uppercase tracking-[0.3em] text-accent transition-colors hover:bg-accent hover:text-white">
        <span className="h-1 w-4 bg-current" />
        Initialize Re-Sync
      </button>

      <div className="mt-8 text-[9px] font-mono text-muted/30">
        Error_Log_Ref: ERR_0x442_CROSS_REF_TIMEOUT
      </div>
    </div>
  );
}