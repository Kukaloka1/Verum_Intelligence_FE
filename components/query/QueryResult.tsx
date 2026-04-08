import { QuerySummary } from "./QuerySummary";
import { QueryStructuredBody } from "./QueryStructuredBody";
import { QueryLimitations } from "./QueryLimitations";
import { CitationList } from "./CitationList";

export function QueryResult() {
  return (
    <div className="space-y-5">
      <QuerySummary />
      <QueryStructuredBody />
      <QueryLimitations />
      <CitationList />
    </div>
  );
}
