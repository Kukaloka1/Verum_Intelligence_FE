interface SaveQueryButtonProps {
  checked: boolean;
  canSaveQuery: boolean;
  isLoading: boolean;
  onCheckedChange: (value: boolean) => void;
}

export function SaveQueryButton({
  checked,
  canSaveQuery,
  isLoading,
  onCheckedChange
}: SaveQueryButtonProps) {
  if (!canSaveQuery) {
    return (
      <div className="group relative overflow-hidden rounded-xl border border-dashed border-border/60 p-4 transition-all hover:border-border">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="font-medium text-foreground">Save query snapshot</span>
          <span className="rounded-md border border-border/50 bg-muted/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
            Sign-in required
          </span>
        </div>
        <p className="max-w-[30ch] text-xs leading-relaxed text-muted">
          Sign in to save query snapshots. Saved query snapshots are available for authenticated
          users.
        </p>
      </div>
    );
  }

  return (
    <label
      className={`group relative flex cursor-pointer items-start gap-4 rounded-xl border border-border/50 p-4 transition-all duration-200 ${
        checked ? "border-accent/30 bg-accent/[0.03]" : "bg-transparent hover:bg-muted/5"
      } ${isLoading ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <div className="relative mt-0.5 flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          disabled={isLoading}
          className="peer h-4 w-4 shrink-0 appearance-none rounded border border-border/80 bg-background transition-all checked:border-accent checked:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
          onChange={(event) => onCheckedChange(event.target.checked)}
        />
        <svg
          className="pointer-events-none absolute h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={4}
        >
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <span className="space-y-1">
        <span className="block text-sm font-medium text-foreground">Save query snapshot</span>
        <span className="block text-xs leading-relaxed text-muted">
          Persists the answer snapshot to backend for your authenticated workspace.
        </span>
      </span>
    </label>
  );
}
