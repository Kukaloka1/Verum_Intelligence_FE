import type { QueryAnswerSection } from "@/types/query";

interface QueryStructuredBodyProps {
  sections: QueryAnswerSection[];
}

export function QueryStructuredBody({ sections }: QueryStructuredBodyProps) {
  return (
<section className="space-y-5 rounded-2xl border border-border bg-background p-4 md:p-5">      <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
        Structured Answer
      </div>

      <div className="relative space-y-12 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-24px)] before:w-px before:bg-border/40">
        {sections.map((section, index) => (
          <article
            key={`${section.sectionTitle}-${index}`}
  className="group relative rounded-2xl border border-border bg-background/88 p-4 md:p-5 pl-10 md:pl-12"
          >
            <div className="absolute left-0 top-1 flex items-center justify-center">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-[10px] font-semibold text-muted ring-4 ring-background transition-colors group-hover:border-accent/30 group-hover:text-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-foreground">{section.sectionTitle}</h4>

              <p className="max-w-[72ch] text-[15px] leading-8 text-foreground/92">
                {section.content}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}