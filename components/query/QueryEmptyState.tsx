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
  const happened = summary ?? copy.body;
  const why =
    limitations ??
    "The current query terms and jurisdiction scope did not map to enough indexed regulatory evidence.";
  const nextStep =
    "Refine the query with regulator/framework terms, or broaden scope to All jurisdictions before rerunning.";

  return (
    <section className="rounded-2xl border border-border bg-background p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{copy.title}</div>

      {mode !== "no_results" ? (
        <>
          <p className="mt-2 text-sm text-foreground/90">{happened}</p>
          {limitations ? <p className="mt-2 text-sm text-muted">{limitations}</p> : null}
        </>
      ) : (
        <div className="mt-3 space-y-2 text-sm text-foreground/90">
          <p>
            <span className="font-semibold text-foreground">What happened:</span> {happened}
          </p>
          <p>
            <span className="font-semibold text-foreground">Why:</span> {why}
          </p>
          <p>
            <span className="font-semibold text-foreground">What to do next:</span> {nextStep}
          </p>
        </div>
      )}
    </section>
  );
}
