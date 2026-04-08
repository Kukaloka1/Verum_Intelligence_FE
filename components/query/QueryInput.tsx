import { Button } from "@/components/shared/Button";
import { Textarea } from "@/components/shared/Textarea";
import { JurisdictionSelector } from "./JurisdictionSelector";

export function QueryInput() {
  return (
    <div className="space-y-4">
      <JurisdictionSelector />
      <Textarea
        rows={8}
        defaultValue="What are the licensing implications for a fintech firm in DIFC?"
      />
      <Button>Run Query</Button>
    </div>
  );
}
