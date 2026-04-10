import { cn } from "@/lib/utils/cn";

export function ComparisonValueCell({ value }: { value: string }) {
  const isEntity = value.length > 0 && value.length <= 10;

  return (
    <div className="group/cell relative flex h-full min-h-[120px] flex-col gap-4 p-6 transition-colors duration-200 hover:bg-panel/10">
      <div className="flex items-center gap-2">
        <div className="h-px w-2 bg-accent/40" />
        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted/30">
          Ref_Verified
        </span>
      </div>

      <div
        className={cn(
          "min-w-0 break-words text-[13px] leading-relaxed",
          isEntity ? "font-bold tracking-tight text-accent" : "font-normal text-foreground/80"
        )}
      >
        {value}
      </div>

      <div className="absolute bottom-2 right-2 h-1 w-1 border-b border-r border-border/0 transition-colors group-hover/cell:border-border/50" />
    </div>
  );
}
