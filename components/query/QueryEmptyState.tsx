interface QueryEmptyStateProps {
  mode: "idle" | "loading" | "no_results";
  summary?: string;
  limitations?: string;
}

const COPY_BY_MODE: Record<QueryEmptyStateProps["mode"], { title: string; body: string }> = {
  idle: {
    title: "Awaiting query execution",
    body: "Run a regulatory question to generate a grounded, citation-backed result."
  },
  loading: {
    title: "Processing grounded retrieval",
    body: "The backend is running guardrails, retrieval, and synthesis against stored source records."
  },
  no_results: {
    title: "No grounded results",
    body: "The current dataset did not provide enough evidence for a grounded answer in this scope."
  }
};

export function QueryEmptyState({ mode, summary, limitations }: QueryEmptyStateProps) {
  const copy = COPY_BY_MODE[mode];

  return (
    <section className="rounded-2xl border border-border bg-background p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{copy.title}</div>
      <p className="mt-2 text-sm text-foreground/90">{summary ?? copy.body}</p>
      {limitations ? <p className="mt-2 text-sm text-muted">{limitations}</p> : null}
    </section>
  );
}

