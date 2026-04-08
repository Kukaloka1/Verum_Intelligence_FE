import { cn } from "@/lib/utils/cn";

interface QueryLimitationsProps {
  limitations: string;
  tone?: "warning" | "critical";
}

export function QueryLimitations({ limitations, tone = "warning" }: QueryLimitationsProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border p-4 text-sm",
        tone === "critical"
          ? "border-accent/35 bg-accent/10 text-foreground"
          : "border-border bg-background text-foreground/90"
      )}
    >
      <div className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        Limitations
      </div>
      <p className="leading-relaxed">{limitations}</p>
    </section>
  );
}

