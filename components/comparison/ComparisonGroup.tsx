import { ComparisonRow } from "./ComparisonRow";

export function ComparisonGroup() {
  return (
    <div className="space-y-4">
      <div className="text-lg font-medium">Licensing Requirements</div>
      <ComparisonRow />
      <ComparisonRow />
    </div>
  );
}
