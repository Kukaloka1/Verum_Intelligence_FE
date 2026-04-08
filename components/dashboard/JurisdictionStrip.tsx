import { JurisdictionStatusCard } from "./JurisdictionStatusCard";

export function JurisdictionStrip() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <JurisdictionStatusCard jurisdiction="DIFC" status="active" />
      <JurisdictionStatusCard jurisdiction="ADGM" status="high attention" />
      <JurisdictionStatusCard jurisdiction="QFC" status="active" />
      <JurisdictionStatusCard jurisdiction="KSA" status="stable" />
    </div>
  );
}
