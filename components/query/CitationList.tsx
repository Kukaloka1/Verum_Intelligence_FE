import type { QueryCitation } from "@/types/query";
import { CitationItem } from "./CitationItem";

interface CitationListProps {
  citations: QueryCitation[];
}

export function CitationList({ citations }: CitationListProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-border bg-panel2/25 p-4 md:p-5">
      <div className="space-y-1">
        <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Citations</div>
        <p className="text-xs text-muted">
          Source-backed references returned by the backend retrieval layer.
        </p>
      </div>

      {citations.length === 0 ? (
        <div className="rounded-2xl border border-border bg-background p-3.5 text-sm text-muted">
          No citations were returned for this result.
        </div>
      ) : (
        <div className="space-y-2">
          {citations.map((citation, index) => (
            <CitationItem
              key={`${citation.sourceName}-${citation.documentTitle}-${index}`}
              citation={citation}
              index={index}
            />
          ))}
        </div>
      )}
    </section>
  );
}
