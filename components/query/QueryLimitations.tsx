import { cn } from "@/lib/utils/cn";

interface QueryLimitationsProps {
  limitations: string;
  tone?: "warning" | "critical";
  reason?: string;
  nextStep?: string;
}

export function QueryLimitations({
  limitations,
  tone = "warning",
  reason,
  nextStep
}: QueryLimitationsProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border p-4 text-sm",
        tone === "critical"
          ? "border-accent/35 bg-accent/10 text-foreground"
          : "border-amber-500/20 bg-amber-500/10 text-foreground/92"
      )}
    >
      <div className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        Coverage Note
      </div>

      {!reason && !nextStep ? (
        <p className="max-w-[72ch] leading-relaxed">{limitations}</p>
      ) : (
        <div className="space-y-1 leading-relaxed">
          <p>
            <span className="font-semibold text-foreground">Scope:</span> {limitations}
          </p>
          {reason ? (
            <p>
              <span className="font-semibold text-foreground">Reason:</span> {reason}
            </p>
          ) : null}
          {nextStep ? (
            <p>
              <span className="font-semibold text-foreground">Suggested next step:</span> {nextStep}
            </p>
          ) : null}
        </div>
      )}
    </section>
  );
}
