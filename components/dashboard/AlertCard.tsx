import { Card } from "@/components/shared/Card";

export function AlertCard() {
  return (
    <Card>
      <div className="text-sm text-muted">ADGM · FSRA</div>
      <div className="mt-2 text-lg font-medium text-foreground">
        New official consultation detected
      </div>
      <p className="mt-2 text-sm text-muted">
        May affect reporting obligations and monitored regulatory expectations.
      </p>
    </Card>
  );
}
