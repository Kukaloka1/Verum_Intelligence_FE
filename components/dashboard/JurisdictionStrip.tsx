import { JurisdictionStatusCard } from "./JurisdictionStatusCard";

const JURISDICTIONS = [
  { jurisdiction: "DIFC", status: "active" },
  { jurisdiction: "ADGM", status: "high attention" },
  { jurisdiction: "QFC", status: "active" },
  { jurisdiction: "KSA", status: "stable" },
] as const;

export function JurisdictionStrip() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:pb-0">
      {JURISDICTIONS.map(({ jurisdiction, status }) => (
        <div key={jurisdiction} className="min-w-[160px] shrink-0 md:min-w-0">
          <JurisdictionStatusCard jurisdiction={jurisdiction} status={status} />
        </div>
      ))}
    </div>
  );
}
