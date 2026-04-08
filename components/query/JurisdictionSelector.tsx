import { Select } from "@/components/shared/Select";

const JURISDICTION_OPTIONS = [
  { value: "__all__", label: "All jurisdictions" },
  { value: "DIFC", label: "DIFC" },
  { value: "ADGM", label: "ADGM" },
  { value: "QFC", label: "QFC" },
  { value: "KSA", label: "KSA" }
] as const;

interface JurisdictionSelectorProps {
  value: string | null;
  disabled?: boolean;
  onChange: (value: string | null) => void;
}

export function JurisdictionSelector({
  value,
  disabled = false,
  onChange
}: JurisdictionSelectorProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="jurisdiction-selector" className="text-sm font-medium text-foreground/90">
        Jurisdiction Scope
      </label>
      <Select
        id="jurisdiction-selector"
        disabled={disabled}
        value={value ?? "__all__"}
        className="!border-border !bg-background !text-foreground"
        onChange={(event) => onChange(event.target.value === "__all__" ? null : event.target.value)}
      >
        {JURISDICTION_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
