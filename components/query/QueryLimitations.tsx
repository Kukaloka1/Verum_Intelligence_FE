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
        "relative py-2 pl-4 text-sm transition-all md:pl-6",
        tone === "critical"
          ? "border-l-2 border-accent/40 bg-accent/[0.03] text-foreground"
          : "border-l-2 border-amber-500/40 bg-amber-500/[0.03] text-foreground/92"
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <div
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            tone === "critical" ? "bg-accent" : "bg-amber-500"
          )}
        />
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Coverage Note
        </div>
      </div>

      {!reason && !nextStep ? (
        <p className="max-w-none break-words leading-7 italic md:max-w-[72ch]">{limitations}</p>
      ) : (
        <div className="flex max-w-none flex-col gap-3 leading-relaxed md:max-w-[72ch]">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
              Scope
            </span>
            <p className="break-words">{limitations}</p>
          </div>

          {reason ? (
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                Reason
              </span>
              <p className="break-words">{reason}</p>
            </div>
          ) : null}

          {nextStep ? (
            <div className="mt-2 flex items-start gap-2 rounded-lg border border-border/40 bg-background/50 p-3">
              <span className="mt-0.5 shrink-0 text-[10px]">➔</span>
              <p className="min-w-0 break-words">
                <span className="font-semibold text-foreground">Suggested next step:</span>{" "}
                {nextStep}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}