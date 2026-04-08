import { ComparisonValueCell } from "./ComparisonValueCell";

export function ComparisonRow() {
  return (
    <div className="grid gap-4 border-t border-white/10 pt-4 md:grid-cols-[220px_1fr_1fr]">
      <div className="text-sm text-white/60">Licensing Authority</div>
      <ComparisonValueCell value="DFSA" />
      <ComparisonValueCell value="FSRA" />
    </div>
  );
}
