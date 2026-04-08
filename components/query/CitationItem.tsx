import type { QueryCitation } from "@/types/query";

interface CitationItemProps {
  citation: QueryCitation;
  index: number;
}

function formatPublishedAt(value: string | null) {
  if (!value) {
    return "Date unavailable";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString();
}

export function CitationItem({ citation, index }: CitationItemProps) {
  return (
    <article className="rounded-2xl border border-border bg-background p-3 text-sm text-foreground/90">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          Citation {index + 1}
        </span>
        <span className="text-xs text-muted">{formatPublishedAt(citation.publishedAt)}</span>
      </div>

      <p className="font-medium text-foreground">{citation.documentTitle}</p>
      <p className="mt-1 text-xs text-muted">
        {citation.sourceName}
        {citation.sourceType ? ` • ${citation.sourceType}` : ""}
      </p>

      {citation.url ? (
        <a
          href={citation.url}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block text-xs font-medium text-accent hover:underline"
        >
          Open Source
        </a>
      ) : (
        <p className="mt-2 text-xs text-muted">No direct URL available.</p>
      )}
    </article>
  );
}

