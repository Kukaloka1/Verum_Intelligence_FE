import { PageHeader } from "@/components/layout/PageHeader";
import { ComparisonSelector } from "./ComparisonSelector";
import { ComparisonTable } from "./ComparisonTable";

export function ComparisonPageShell() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Framework Comparison"
        description="Side-by-side comparison across GCC jurisdictions."
      />
      <ComparisonSelector />
      <ComparisonTable />
    </div>
  );
}
