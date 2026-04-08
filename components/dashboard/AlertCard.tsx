import { Card } from "@/components/shared/Card";

export function AlertCard() {
  return (
    <Card>
      <div className="text-sm text-white/50">ADGM · FSRA</div>
      <div className="mt-2 text-lg font-medium">New official consultation detected</div>
      <p className="mt-2 text-sm text-white/65">May affect reporting obligations and monitored regulatory expectations.</p>
    </Card>
  );
}
