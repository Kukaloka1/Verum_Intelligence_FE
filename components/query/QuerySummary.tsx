import type { QuerySuccessStatus } from "@/types/query";

interface QuerySummaryProps {
  summary: string;
  status: Extract<QuerySuccessStatus, "success" | "partial">;
}

const STATUS_LABELS: Record<QuerySummaryProps["status"], string> = {
  success: "Grounded Success",
  partial: "Grounded Partial"
};

export function QuerySummary({ summary, status }: QuerySummaryProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted/80">
          Executive Summary
        </div>

        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              status === "success" ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
          {STATUS_LABELS[status]}
        </span>
      </div>

      <p className="max-w-none break-words text-base font-medium leading-8 text-foreground/90 selection:bg-primary/10 md:max-w-[65ch]">
        {summary}
      </p>
    </section>
  );
}