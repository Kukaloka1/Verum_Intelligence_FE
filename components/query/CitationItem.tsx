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

export function CitationItem({ citation, index }: CitationItemProps) {
  return (
    <article className="group relative flex min-w-0 flex-col gap-3 border-b border-border/50 pb-8 text-sm text-foreground/90 last:border-0 last:pb-0">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted/70">
            Citation {index + 1}
          </span>

          <div className="h-1 w-1 rounded-full bg-border" />

          <span className="min-w-0 break-words text-xs text-muted">
            {citationSourceLabel(citation)}
          </span>
        </div>

        <span className="shrink-0 text-xs text-muted">{formatPublishedAt(citation.publishedAt)}</span>
      </div>

      <div className="min-w-0 space-y-2">
        {citation.url ? (
          <a
            href={citation.url}
            target="_blank"
            rel="noreferrer"
            className="block min-w-0 break-words text-base font-semibold leading-snug text-foreground transition-colors hover:text-accent hover:underline"
          >
            {citation.documentTitle}
          </a>
        ) : (
          <p className="min-w-0 break-words text-base font-semibold leading-snug text-foreground">
            {citation.documentTitle}
          </p>
        )}

        {citation.url ? (
          <p
            className="min-w-0 break-all font-mono text-[11px] text-muted/70 [overflow-wrap:anywhere]"
            title={citation.url}
          >
            {citation.url}
          </p>
        ) : (
          <p className="text-[11px] text-muted/70">Reference URL unavailable.</p>
        )}
      </div>
    </article>
  );
}
