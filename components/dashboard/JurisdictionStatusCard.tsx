import { Card } from "@/components/shared/Card";

export function JurisdictionStatusCard({
  jurisdiction,
  status
}: {
  jurisdiction: string;
  status: string;
}) {
  return (
    <Card>
      <div className="text-sm text-white/50">{jurisdiction}</div>
      <div className="mt-2 text-xl font-medium">{status}</div>
    </Card>
  );
}
