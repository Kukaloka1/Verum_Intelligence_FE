import { Card } from "@/components/shared/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { QueryInput } from "./QueryInput";
import { QueryResult } from "./QueryResult";

export function QueryPageShell() {
  return (
    <div>
      <PageHeader
        title="AI Query Interface"
        description="Natural-language legal and compliance questions with structured, citable answers."
      />
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card><QueryInput /></Card>
        <Card><QueryResult /></Card>
      </div>
    </div>
  );
}
