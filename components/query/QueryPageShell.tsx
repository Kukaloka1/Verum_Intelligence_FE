import { Card } from "@/components/shared/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { QueryInput } from "./QueryInput";
import { QueryResult } from "./QueryResult";

export function QueryPageShell() {
  return (
    <div className="space-y-6 md:space-y-8">
      <PageHeader
        title="AI Query Interface"
        description="Natural-language legal and compliance questions with structured, citable answers."
      />

      <div className="grid gap-4 md:gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="border border-border bg-panel shadow-[var(--shadow)]">
          <QueryInput />
        </Card>

        <Card className="border border-border bg-panel shadow-[var(--shadow)]">
          <QueryResult />
        </Card>
      </div>
    </div>
  );
}
