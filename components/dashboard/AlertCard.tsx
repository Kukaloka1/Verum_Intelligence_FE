import { Card } from "@/components/shared/Card";

export function AlertCard() {
  return (
    <Card className="group relative overflow-hidden border-border/60 bg-panel/20 p-6 transition-colors duration-200 hover:border-border hover:bg-panel/30">
      <div className="absolute inset-x-0 top-0 h-px bg-border/50" />

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            ADGM · FSRA
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="text-base font-semibold tracking-tight text-foreground">
            New official consultation detected
          </div>
          <p className="text-sm leading-relaxed text-muted">
            May affect reporting obligations and monitored regulatory expectations.
          </p>
        </div>
      </div>
    </Card>
  );
}