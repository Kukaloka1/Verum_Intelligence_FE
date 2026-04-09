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
    <section className="flex min-h-[400px] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-6 flex flex-col items-center gap-4">
        {mode === "loading" ? <div className="h-1 w-12 rounded-full bg-border/40" /> : <div className="h-1 w-12 rounded-full bg-border/40" />}

        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          {copy.title}
        </div>
      </div>

      {mode !== "no_results" ? (
        <div className="flex max-w-[45ch] flex-col gap-3">
          <p className="text-sm leading-relaxed text-foreground/90">{happened}</p>
          {limitations ? (
            <p className="border-t border-border/40 pt-3 text-sm leading-relaxed text-muted">
              {limitations}
            </p>
          ) : null}
        </div>
      ) : (
        <div className="mt-4 flex w-full max-w-[50ch] flex-col gap-6 border-t border-border/50 pt-8 text-left">
          <div className="grid gap-1">
            <p className="text-sm leading-relaxed text-foreground/90">
              <span className="font-semibold text-foreground">What happened:</span> {happened}
            </p>
          </div>

          <div className="grid gap-1">
            <p className="text-sm leading-relaxed text-foreground/90">
              <span className="font-semibold text-foreground">Why:</span> {why}
            </p>
          </div>

          <div className="rounded-xl border border-dashed border-border bg-muted/5 p-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm leading-relaxed text-foreground/90">
                <span className="font-semibold text-foreground">What to do next:</span> {nextStep}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
