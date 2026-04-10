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
    <Card className="group relative overflow-hidden border-border/30 bg-panel/10 p-5 transition-colors duration-200 hover:border-border/50 hover:bg-panel/20">
      <div
        className={`absolute right-4 top-4 h-1.5 w-1.5 rounded-full ${
          status === "high attention"
            ? "bg-accent"
            : status === "stable"
              ? "bg-muted/40"
              : "bg-foreground/30"
        }`}
      />

      <div className="flex flex-col gap-3">
        <div className="break-words text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
          {jurisdiction}
        </div>

        <div className={`break-words text-xl font-semibold uppercase tracking-tight ${statusTone}`}>
          {status}
        </div>

        <div className="mt-1 h-px w-full bg-border/20">
          <div
            className={`h-full ${
              status === "high attention"
                ? "w-full bg-accent"
                : status === "stable"
                  ? "w-1/3 bg-muted/30"
                  : "w-2/3 bg-foreground/20"
            }`}
          />
        </div>
      </div>
    </Card>
  );
}