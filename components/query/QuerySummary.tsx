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
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Summary</div>
        <span className="rounded-full border border-border bg-panel px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-muted">
          {STATUS_LABELS[status]}
        </span>
      </div>
      <p className="max-w-[72ch] text-[15px] leading-7 text-foreground/95">{summary}</p>
    </section>
  );
}
