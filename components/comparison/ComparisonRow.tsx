import { ComparisonValueCell } from "./ComparisonValueCell";

export function ComparisonRow() {
  return (
    <div className="group relative grid gap-0 transition-colors duration-200 hover:bg-panel/10 md:grid-cols-[280px_1fr_1fr]">
      <div className="absolute left-0 top-0 h-full w-[2px] bg-accent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-center border-r border-border/20 bg-panel/10 px-6 py-5 md:py-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 transition-colors group-hover:text-muted/70">
            Parameter ID: 04-LR
          </span>
          <div className="text-xs font-bold uppercase tracking-wide text-foreground/80 group-hover:text-foreground">
            Licensing Authority
          </div>
        </div>
      </div>

      <div className="border-r border-border/10">
        <ComparisonValueCell value="DFSA" />
      </div>

      <div>
        <ComparisonValueCell value="FSRA" />
      </div>

      <div className="absolute bottom-0 right-0 h-1 w-1 border-b border-r border-accent/30 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}
