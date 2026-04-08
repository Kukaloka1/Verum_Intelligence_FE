import type { QueryAnswerSection } from "@/types/query";

interface QueryStructuredBodyProps {
  sections: QueryAnswerSection[];
}

export function QueryStructuredBody({ sections }: QueryStructuredBodyProps) {
  return (
    <section className="space-y-3">
      <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
        Structured Answer
      </div>

      <div className="space-y-3">
        {sections.map((section, index) => (
          <article
            key={`${section.sectionTitle}-${index}`}
            className="rounded-2xl border border-border bg-background p-3"
          >
            <h4 className="text-sm font-semibold text-foreground">{section.sectionTitle}</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{section.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

