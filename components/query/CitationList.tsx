import { CitationItem } from "./CitationItem";

export function CitationList() {
  return (
    <div>
      <div className="mb-2 text-sm text-white/50">Citations</div>
      <div className="space-y-2">
        <CitationItem />
        <CitationItem />
      </div>
    </div>
  );
}
