import { ComparisonRow } from "./ComparisonRow";

export function ComparisonGroup() {
  return (
    <div className="mb-12 flex flex-col overflow-hidden rounded-xl border border-border/30 bg-panel/5">
      <div className="flex items-center gap-4 border-b border-border/30 bg-panel/15 px-6 py-4">
        <div className="flex h-6 w-1 bg-accent" />
        <div className="flex flex-col">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-accent">
            Classification Layer
          </span>
          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
            Licensing Requirements
          </h2>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-border/20">
        <ComparisonRow />
        <ComparisonRow />
        <ComparisonRow />
      </div>
    </div>
  );
}