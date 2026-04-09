import { Textarea } from "@/components/shared/Textarea";
import { JurisdictionSelector } from "./JurisdictionSelector";
import { QueryActions } from "./QueryActions";

interface QueryInputProps {
  query: string;
  queryPlaceholder: string;
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
  queryPlaceholder,
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
      className="flex flex-col gap-8 p-5 md:gap-10 md:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit();
      }}
    >
      <div className="flex flex-col gap-1.5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
          Query Input
        </h2>
        <p className="max-w-[62ch] text-sm leading-relaxed text-foreground/80">
          Submit a source-backed legal or regulatory question. The backend answer is constrained to
          grounded corpus evidence.
        </p>
      </div>

      <div className="border-t border-border/50 pt-3">
        <JurisdictionSelector
          value={jurisdiction}
          disabled={isLoading}
          onChange={onJurisdictionChange}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="query-input" className="text-sm font-medium text-foreground/90">
            Regulatory Question
          </label>
          <span className="text-xs tabular-nums text-muted">{query.length}/4000</span>
        </div>

        <Textarea
          id="query-input"
          rows={9}
          value={query}
          disabled={isLoading}
          maxLength={4000}
          placeholder={queryPlaceholder}
          className="!min-h-[250px] !border-border/80 !bg-background !px-5 !py-4 !text-[15px] !leading-8 !text-foreground placeholder:!text-muted/70 resize-none shadow-none"
          onChange={(event) => onQueryChange(event.target.value)}
        />

        <div className="flex items-center justify-between text-xs text-muted">
          <span>Max 4000 chars.</span>
          <span>{query.length}/4000</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {validationDetails.length > 0 ? (
          <div className="border-l-2 border-accent/40 py-1 pl-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Validation details
            </div>
            <ul className="space-y-1.5">
              {validationDetails.map((detail) => (
                <li key={detail} className="flex items-start gap-2 text-sm text-foreground/90">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {preSubmitWarning ? (
          <div className="border-l-2 border-amber-500/40 bg-amber-500/[0.03] py-1 pl-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-600">
              Jurisdiction check
            </div>
            <p className="text-sm leading-relaxed text-foreground/90">{preSubmitWarning}</p>
          </div>
        ) : null}
      </div>

      <div className="border-t border-border/50 pt-6">
        <QueryActions
          isLoading={isLoading}
          saveQuery={saveQuery}
          canSaveQuery={canSaveQuery}
          onSaveQueryChange={onSaveQueryChange}
          onReset={onResetForm}
        />
      </div>
    </form>
  );
}
