import type { QueryCitation } from "@/types/query";
import { CitationItem } from "./CitationItem";

interface CitationListProps {
  citations: QueryCitation[];
}

export function CitationList({ citations }: CitationListProps) {
  return (
    <section className="flex flex-col">
      <div className="mb-8 space-y-1.5">
        <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
          Citations
        </div>
        <p className="max-w-[45ch] text-xs leading-relaxed text-muted/70">
          Source-backed references returned by the backend retrieval layer.
        </p>
      </div>

      {citations.length === 0 ? (
        <div className="flex items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/5 px-4 py-12">
          <p className="text-sm text-muted">No citations were returned for this result.</p>
        </div>
      ) : (
        <div className="flex flex-col">
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
