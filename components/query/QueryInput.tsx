import { Textarea } from "@/components/shared/Textarea";
import { JurisdictionSelector } from "./JurisdictionSelector";
import { QueryActions } from "./QueryActions";

interface QueryInputProps {
  query: string;
  jurisdiction: string | null;
  saveQuery: boolean;
  canSaveQuery: boolean;
  isLoading: boolean;
  preSubmitWarning?: string | null;
  validationDetails: string[];
  onQueryChange: (value: string) => void;
  onJurisdictionChange: (value: string | null) => void;
  onSaveQueryChange: (value: boolean) => void;
  onSubmit: () => void | Promise<void>;
  onResetForm: () => void;
}

export function QueryInput({
  query,
  jurisdiction,
  saveQuery,
  canSaveQuery,
  isLoading,
  preSubmitWarning,
  validationDetails,
  onQueryChange,
  onJurisdictionChange,
  onSaveQueryChange,
  onSubmit,
  onResetForm
}: QueryInputProps) {
  return (
    <form
      className="space-y-4 md:space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit();
      }}
    >
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
          Query Input
        </h2>
        <p className="mt-1 text-sm text-foreground/80">
          Submit a source-backed legal or regulatory question. The backend answer is constrained to
          grounded corpus evidence.
        </p>
      </div>

      <JurisdictionSelector
        value={jurisdiction}
        disabled={isLoading}
        onChange={onJurisdictionChange}
      />

      <div className="space-y-2">
        <label htmlFor="query-input" className="text-sm font-medium text-foreground/90">
          Regulatory Question
        </label>
        <Textarea
          id="query-input"
          rows={8}
          value={query}
          disabled={isLoading}
          maxLength={4000}
          placeholder="What are the licensing implications for a fintech firm in DIFC?"
          className="!border-border !bg-background !text-foreground placeholder:!text-muted/70"
          onChange={(event) => onQueryChange(event.target.value)}
        />
        <div className="flex items-center justify-between text-xs text-muted">
          <span>Max 4000 chars.</span>
          <span>{query.length}/4000</span>
        </div>
      </div>

      {validationDetails.length > 0 ? (
        <div className="rounded-2xl border border-accent/35 bg-accent/10 p-3 text-sm text-foreground">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Validation details
          </div>
          <ul className="mt-2 space-y-1">
            {validationDetails.map((detail) => (
              <li key={detail} className="list-inside list-disc text-sm text-foreground/90">
                {detail}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {preSubmitWarning ? (
        <div className="rounded-2xl border border-amber-500/35 bg-amber-500/10 p-3 text-sm text-foreground">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-600">
            Jurisdiction check
          </div>
          <p className="mt-2 text-sm text-foreground/90">{preSubmitWarning}</p>
        </div>
      ) : null}

      <QueryActions
        isLoading={isLoading}
        saveQuery={saveQuery}
        canSaveQuery={canSaveQuery}
        onSaveQueryChange={onSaveQueryChange}
        onReset={onResetForm}
      />
    </form>
  );
}
