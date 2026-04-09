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
      <div className="rounded-2xl border border-border bg-background p-3 text-sm">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-foreground">Save query snapshot</span>
          <span className="rounded-full border border-border bg-panel px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
            Sign-in required
          </span>
        </div>
        <p className="mt-1 text-xs text-muted">
          Sign in to save query snapshots. Saved query snapshots are available for authenticated
          users.
        </p>
      </div>
    );
  }

  return (
    <label
      className={`flex items-start gap-3 rounded-2xl border border-border bg-background p-3 ${
        isLoading ? "opacity-70" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={isLoading}
        className="mt-0.5 h-4 w-4 accent-[var(--accent)]"
        onChange={(event) => onCheckedChange(event.target.checked)}
      />

      <span className="space-y-0.5">
        <span className="block text-sm font-medium text-foreground">Save query snapshot</span>
        <span className="block text-xs text-muted">
          Persists the answer snapshot to backend for your authenticated workspace.
        </span>
      </span>
    </label>
  );
}
