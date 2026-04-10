export function ComparisonSelector() {
  return (
    <div className="flex w-full items-center justify-between gap-6">
      <div className="flex min-w-0 items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/20 bg-accent/5 text-[10px] font-black text-accent">
            VS
          </div>

          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted/40">
              Comparison Mode
            </span>
            <div className="text-sm font-bold tracking-tight text-foreground">
              DIFC <span className="mx-2 text-border">/</span> ADGM
            </div>
          </div>
        </div>

        <div className="hidden h-10 w-px bg-border/30 sm:block" />

        <div className="hidden min-w-0 flex-col sm:flex">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted/40">
            Active Framework
          </span>
          <div className="text-sm font-medium text-foreground/80">
            Licensing Requirements
          </div>
        </div>
      </div>

      <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 md:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-500/80">
          Data Synced
        </span>
      </div>
    </div>
  );
}
