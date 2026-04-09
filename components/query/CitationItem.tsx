import type { QueryCitation } from "@/types/query";

interface CitationItemProps {
  citation: QueryCitation;
  index: number;
}

function citationSourceLabel(citation: QueryCitation) {
  if (!citation.sourceType) {
    return citation.sourceName;
  }

  return `${citation.sourceName} · ${citation.sourceType}`;
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

function getDisplayUrl(rawUrl: string) {
  try {
    const parsed = new URL(rawUrl);
    return `${parsed.hostname}${parsed.pathname}`;
  } catch {
    return rawUrl;
  }
}

export function CitationItem({ citation, index }: CitationItemProps) {
  return (
    <article className="rounded-2xl border border-border bg-background px-4 py-3.5 text-sm text-foreground/90">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-border bg-panel px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-muted">
            Citation {index + 1}
          </span>
          <span className="text-xs text-muted">{citationSourceLabel(citation)}</span>
        </div>
        <span className="text-xs text-muted">{formatPublishedAt(citation.publishedAt)}</span>
      </div>

      {citation.url ? (
        <a
          href={citation.url}
          target="_blank"
          rel="noreferrer"
          className="mt-2 block text-sm font-semibold leading-relaxed text-foreground hover:text-accent hover:underline"
        >
          {citation.documentTitle}
        </a>
      ) : (
        <p className="mt-2 text-sm font-semibold leading-relaxed text-foreground">{citation.documentTitle}</p>
      )}

      {citation.url ? (
        <p className="mt-1 text-xs text-muted">{getDisplayUrl(citation.url)}</p>
      ) : (
        <p className="mt-1 text-xs text-muted">Reference URL unavailable.</p>
      )}
    </article>
  );
}
