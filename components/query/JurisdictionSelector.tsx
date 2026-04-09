import { Select } from "@/components/shared/Select";

const JURISDICTION_OPTIONS = [
  { value: "__all__", label: "All jurisdictions", available: true },
  { value: "DIFC", label: "DIFC", available: true },
  { value: "ADGM", label: "ADGM", available: true },
  { value: "QFC", label: "QFC — coming soon", available: false },
  { value: "KSA", label: "KSA — coming soon", available: false }
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
  const selectedValue = value ?? "__all__";
  const selectedOption = JURISDICTION_OPTIONS.find((option) => option.value === selectedValue);
  const selectedIsUnavailable = selectedOption ? !selectedOption.available : false;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor="jurisdiction-selector" className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/90">
          Jurisdiction Scope
        </label>
        <span className="rounded-full border border-border/70 bg-background/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
          DIFC + ADGM live
        </span>
      </div>

      <div className="relative">
        <Select
          id="jurisdiction-selector"
          disabled={disabled}
          value={selectedValue}
          className="h-12 appearance-none !rounded-2xl !border-border/90 !bg-background !pl-4 !pr-10 !text-[13px] !font-semibold !tracking-[0.08em] !text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] transition-colors focus:!border-accent/60 focus:outline-none"
          onChange={(event) => onChange(event.target.value === "__all__" ? null : event.target.value)}
        >
          {JURISDICTION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} disabled={!option.available}>
              {option.label}
            </option>
          ))}
        </Select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted/70" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <p className="text-xs leading-relaxed text-muted/90">
        QFC and KSA remain visible but locked until their official corpus is enabled.
      </p>

      {selectedIsUnavailable ? (
        <p className="text-xs font-medium text-amber-600">
          This jurisdiction is currently unavailable. Please pick DIFC, ADGM, or All jurisdictions.
        </p>
      ) : null}
    </div>
  );
}
