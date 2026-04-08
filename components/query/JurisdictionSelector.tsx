import { Select } from "@/components/shared/Select";

export function JurisdictionSelector() {
  return (
    <div className="space-y-2">
      <label className="text-sm text-white/70">Jurisdiction</label>
      <Select defaultValue="DIFC">
        <option>DIFC</option>
        <option>ADGM</option>
        <option>QFC</option>
        <option>KSA</option>
      </Select>
    </div>
  );
}
