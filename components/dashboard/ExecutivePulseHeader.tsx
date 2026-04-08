import { Card } from "@/components/shared/Card";

export function ExecutivePulseHeader() {
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-4">
        <div><div className="text-xs text-white/50">Jurisdictions</div><div className="text-2xl">4</div></div>
        <div><div className="text-xs text-white/50">Recent Updates</div><div className="text-2xl">18</div></div>
        <div><div className="text-xs text-white/50">Active Alerts</div><div className="text-2xl">5</div></div>
        <div><div className="text-xs text-white/50">Latest Refresh</div><div className="text-2xl">11:15</div></div>
      </div>
    </Card>
  );
}
