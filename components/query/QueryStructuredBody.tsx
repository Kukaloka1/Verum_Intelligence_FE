import type { QueryAnswerSection } from "@/types/query";

interface QueryStructuredBodyProps {
  sections: QueryAnswerSection[];
}

export function QueryStructuredBody({ sections }: QueryStructuredBodyProps) {
  return (
    <section className="space-y-3.5">
      <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
        Structured Answer
      </div>

      <div className="space-y-3.5">
        {sections.map((section, index) => (
          <article
            key={`${section.sectionTitle}-${index}`}
            className="rounded-2xl border border-border bg-background p-4 md:p-5"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-border bg-panel px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="text-sm font-semibold text-foreground">{section.sectionTitle}</h4>
            </div>
            <p className="mt-2 max-w-[72ch] text-[15px] leading-7 text-foreground/92">
              {section.content}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
