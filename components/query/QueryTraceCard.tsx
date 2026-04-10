import { cn } from "@/lib/utils/cn";

interface QueryTraceCardProps {
  label: string;
  value: string;
  description: string;
  state?: "neutral" | "positive" | "warning";
  valueVariant?: "default" | "metric_compact";
}

function parseMetricValue(value: string): { count: string; suffix: string } | null {
  const match = value.match(/^(\d+)\s+([a-z]+)$/i);
  if (!match) {
    return null;
  }

  return {
    count: match[1],
    suffix: match[2]
  };
}

export function QueryTraceCard({
  label,
  value,
  description,
  state = "neutral",
  valueVariant = "default"
}: QueryTraceCardProps) {
  const metricValue = valueVariant === "metric_compact" ? parseMetricValue(value) : null;

  return (
    <article
      className={cn(
        "flex min-h-[132px] flex-col justify-between rounded-2xl border p-4 md:p-5",
        state === "positive" && "border-emerald-500/30 bg-emerald-500/5",
        state === "warning" && "border-amber-500/35 bg-amber-500/[0.08]",
        state === "neutral" && "border-border/80 bg-background/70"
      )}
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
        {label}
      </div>

      {metricValue ? (
        <div className="flex items-end gap-2.5">
          <span
            className={cn(
              "text-[1.35rem] font-semibold leading-tight tracking-tight md:text-[1.5rem]",
              state === "positive" && "text-emerald-700 dark:text-emerald-300",
              state === "warning" && "text-amber-700 dark:text-amber-300",
              state === "neutral" && "text-foreground"
            )}
          >
            {metricValue.count}
          </span>
          <span className="pb-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted/85">
            {metricValue.suffix}
          </span>
        </div>
      ) : (
        <div
          className={cn(
            "text-xl font-semibold leading-tight tracking-tight md:text-[1.45rem]",
            state === "positive" && "text-emerald-700 dark:text-emerald-300",
            state === "warning" && "text-amber-700 dark:text-amber-300",
            state === "neutral" && "text-foreground"
          )}
        >
          {value}
        </div>
      )}

      <p className="text-xs leading-relaxed text-muted">{description}</p>
    </article>
  );
}
