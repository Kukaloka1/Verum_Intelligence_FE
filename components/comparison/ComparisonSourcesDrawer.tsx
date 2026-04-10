export function ComparisonSourcesDrawer() {
  return (
    <div className="flex h-full flex-col border-l border-border/30 bg-panel/20 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-border/30 p-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">
            Source Verification
          </span>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Intelligence Dossier
          </h2>
        </div>
        <div className="text-[9px] font-mono uppercase text-muted/40">Ref_ID: 992-ARC</div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="group relative flex flex-col gap-2 rounded-lg border border-border/20 bg-background/40 p-4 transition-colors hover:border-accent/30"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-widest text-muted/60">
                Official Gazetee · {2026 - i}
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <p className="text-xs font-semibold text-foreground/90">
              Regulatory Amendment No. {i * 42} regarding Capital Adequacy
            </p>

            <div className="mt-2 flex items-center gap-3">
              <button className="text-[10px] font-black uppercase tracking-widest text-accent/80 transition-colors hover:text-accent">
                View Original PDF
              </button>
              <div className="h-3 w-px bg-border/40" />
              <button className="text-[10px] font-black uppercase tracking-widest text-muted/60 transition-colors hover:text-foreground">
                Copy Citation
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border/30 bg-panel/10 p-6">
        <div className="text-[8px] font-bold uppercase tracking-[0.3em] leading-relaxed text-muted/40">
          All documents are cryptographically verified against official GCC regulators at{" "}
          {new Date().toLocaleDateString()}.
        </div>
      </div>
    </div>
  );
}