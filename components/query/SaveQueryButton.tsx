interface SaveQueryButtonProps {
  checked: boolean;
  disabled: boolean;
  onCheckedChange: (value: boolean) => void;
}

export function SaveQueryButton({
  checked,
  disabled,
  onCheckedChange
}: SaveQueryButtonProps) {
  return (
    <label className="flex items-start gap-3 rounded-2xl border border-border bg-background p-3">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="mt-0.5 h-4 w-4 accent-[var(--accent)]"
        onChange={(event) => onCheckedChange(event.target.checked)}
      />

      <span className="space-y-0.5">
        <span className="block text-sm font-medium text-foreground">Save query snapshot</span>
        <span className="block text-xs text-muted">
          Persists answer snapshot to backend only when authenticated user context is available.
        </span>
      </span>
    </label>
  );
}

