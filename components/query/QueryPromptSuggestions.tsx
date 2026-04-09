import { resolveQuerySuggestions } from "@/lib/query/preset-queries";

interface QueryPromptSuggestionsProps {
  jurisdiction: string | null;
  currentQuery: string;
  disabled?: boolean;
  onSelectPrompt: (prompt: string) => void;
}

function resolveJurisdictionLabel(jurisdiction: string | null): string {
  if (!jurisdiction) {
    return "All jurisdictions";
  }

  return jurisdiction;
}

export function QueryPromptSuggestions({
  jurisdiction,
  currentQuery,
  disabled = false,
  onSelectPrompt
}: QueryPromptSuggestionsProps) {
  const suggestions = resolveQuerySuggestions(jurisdiction);
  const normalizedCurrentQuery = currentQuery.trim();

  return (
    <section className="rounded-2xl bg-background/70 p-4 md:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          Suggested Queries
        </div>
        <span className="rounded-full border-[0.5px] border border-border/30 bg-panel/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/75">
          {resolveJurisdictionLabel(jurisdiction)}
        </span>
      </div>

      <div className="grid gap-2.5">
        {suggestions.map((prompt) => {
          const isActive = normalizedCurrentQuery === prompt;

          return (
            <button
              key={prompt}
              type="button"
              disabled={disabled}
              className={`group w-full rounded-xl border-[0.5px] border px-3 py-2.5 text-left text-sm leading-relaxed transition ${
                isActive
                  ? "border-accent/25 bg-accent/[0.08] text-foreground"
                  : "border-border/30 bg-panel/15 text-foreground/90 hover:border-accent/15 hover:bg-panel/25"
              } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
              onClick={() => onSelectPrompt(prompt)}
            >
              <span className="inline-flex items-start gap-2.5">
                <span
                  className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                    isActive ? "bg-accent" : "bg-muted/70 group-hover:bg-accent/80"
                  }`}
                />
                <span className="break-words">{prompt}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
