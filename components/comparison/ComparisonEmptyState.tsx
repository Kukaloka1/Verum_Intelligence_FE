export function ComparisonEmptyState() {
  return (
    <div className="relative flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-border/50 bg-panel/5 p-12 text-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
        <div className="h-[300px] w-[300px] rounded-full border border-border/30" />
        <div className="absolute h-[500px] w-[500px] rounded-full border border-border/15" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-8 grid grid-cols-2 gap-2 opacity-20">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-16 rounded border border-border" />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-muted/40">
            Awaiting_Parameters
          </div>
          <h3 className="text-xl font-bold tracking-tight text-foreground/60">
            Matrix Not Initialized
          </h3>
          <p className="mx-auto mt-2 max-w-[35ch] text-sm leading-relaxed text-muted/50">
            Select at least two jurisdictions from the control surface above to generate the
            cross-reference map.
          </p>
        </div>

        <div className="mt-12 flex items-center gap-4">
          <div className="h-px w-8 bg-border/40" />
          <div className="text-[9px] font-bold uppercase tracking-widest text-muted/30">
            Scanning Module v4.0
          </div>
          <div className="h-px w-8 bg-border/40" />
        </div>
      </div>
    </div>
  );
}
