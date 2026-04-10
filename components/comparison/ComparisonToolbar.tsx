export function ComparisonToolbar() {
  return (
    <div className="flex w-full items-center justify-between border-y border-border/30 bg-panel/5 px-6 py-3">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/60">
            Live_Matrix_Active
          </span>
        </div>

        <div className="hidden items-center gap-2 border-l border-border/30 pl-8 md:flex">
          <span className="text-[9px] font-bold uppercase tracking-widest text-muted/40">
            Nodes:
          </span>
          <span className="text-[10px] font-mono font-bold text-foreground/80">
            02_Selected
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="group flex items-center gap-2 rounded border border-border/30 bg-background/50 px-3 py-1.5 transition-colors hover:border-accent/50 hover:bg-accent/5">
          <div className="h-1 w-1 bg-muted group-hover:bg-accent" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-muted group-hover:text-foreground">
            Export_PDF
          </span>
        </button>

        <button className="group flex items-center gap-2 rounded border border-border/30 bg-background/50 px-3 py-1.5 transition-colors hover:border-accent/50 hover:bg-accent/5">
          <div className="h-1 w-1 bg-muted group-hover:bg-accent" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-muted group-hover:text-foreground">
            Share_Link
          </span>
        </button>
      </div>
    </div>
  );
}