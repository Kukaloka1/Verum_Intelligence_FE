import { Card } from "@/components/shared/Card";

export function ExecutivePulseHeader() {
  return (
    <Card className="border-border/20 bg-panel/10 p-6 md:p-7">
      <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-x-6">
        <div className="flex flex-col gap-1.5 md:pr-6 md:border-r md:border-border/20">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            Jurisdictions
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight tabular-nums text-foreground">
              4
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 md:px-6 md:border-r md:border-border/20">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            Recent Updates
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight tabular-nums text-foreground">
              18
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 md:px-6 md:border-r md:border-border/20">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            Active Alerts
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight tabular-nums text-foreground">
              5
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 md:pl-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            Latest Refresh
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight tabular-nums text-foreground">
              11:15
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}