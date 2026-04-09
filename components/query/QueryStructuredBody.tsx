import type { QueryAnswerSection } from "@/types/query";

interface QueryStructuredBodyProps {
  sections: QueryAnswerSection[];
}

export function QueryStructuredBody({ sections }: QueryStructuredBodyProps) {
  return (
    <section className="space-y-5">
      <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
        Structured Answer
      </div>

      <div className="space-y-8 md:relative md:space-y-12 md:before:absolute md:before:left-[11px] md:before:top-2 md:before:h-[calc(100%-24px)] md:before:w-px md:before:bg-border/40">
        {sections.map((section, index) => (
          <article
            key={`${section.sectionTitle}-${index}`}
            className="group relative pl-0 md:pl-12"
          >
            <div className="mb-3 flex items-center justify-start md:absolute md:left-0 md:top-1 md:mb-0 md:flex md:items-center md:justify-center">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-[10px] font-semibold text-muted md:ring-4 md:ring-background transition-colors group-hover:border-accent/30 group-hover:text-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-foreground">{section.sectionTitle}</h4>

              <p className="max-w-none break-words text-[15px] leading-8 text-foreground/92 md:max-w-[72ch]">
                {section.content}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}