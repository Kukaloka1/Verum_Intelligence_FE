import { ComparisonGroup } from "./ComparisonGroup";

export function ComparisonTable() {
  return (
    <div className="relative flex flex-col gap-16 py-4">
      <div className="absolute left-[30px] top-0 h-full w-px bg-gradient-to-b from-border/30 via-border/10 to-transparent" />

      <ComparisonGroup />
      <ComparisonGroup />

      <div className="flex items-center justify-center pt-8">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-border/30 to-transparent" />
        <span className="mx-4 text-[9px] font-black uppercase tracking-[0.5em] text-muted/20">
          End of Matrix
        </span>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>
    </div>
  );
}
