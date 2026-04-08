import { Card } from "@/components/shared/Card";

export function ExecutivePulseHeader() {
  return (
    <Card>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted">Jurisdictions</div>
          <div className="text-2xl font-semibold text-foreground">4</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-muted">Recent Updates</div>
          <div className="text-2xl font-semibold text-foreground">18</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-muted">Active Alerts</div>
          <div className="text-2xl font-semibold text-foreground">5</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-muted">Latest Refresh</div>
          <div className="text-2xl font-semibold text-foreground">11:15</div>
        </div>
      </div>
    </Card>
  );
}
