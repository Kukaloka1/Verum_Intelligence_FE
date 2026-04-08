import { Card } from "@/components/shared/Card";

export function JurisdictionStatusCard({
  jurisdiction,
  status
}: {
  jurisdiction: string;
  status: string;
}) {
  const statusTone =
    status === "high attention"
      ? "text-accent"
      : status === "stable"
        ? "text-muted"
        : "text-foreground";

  return (
    <Card>
      <div className="text-sm uppercase tracking-wide text-muted">{jurisdiction}</div>
      <div className={`mt-2 text-xl font-medium capitalize ${statusTone}`}>{status}</div>
    </Card>
  );
}
