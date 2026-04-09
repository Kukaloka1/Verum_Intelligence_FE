import { Button } from "@/components/shared/Button";
import { SaveQueryButton } from "./SaveQueryButton";

interface QueryActionsProps {
  isLoading: boolean;
  saveQuery: boolean;
  canSaveQuery: boolean;
  onSaveQueryChange: (value: boolean) => void;
  onReset: () => void;
}

export function QueryActions({
  isLoading,
  saveQuery,
  canSaveQuery,
  onSaveQueryChange,
  onReset
}: QueryActionsProps) {
  return (
    <div className="space-y-4 border-t border-border pt-4">
      <SaveQueryButton
        checked={saveQuery}
        canSaveQuery={canSaveQuery}
        isLoading={isLoading}
        onCheckedChange={onSaveQueryChange}
      />

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          disabled={isLoading}
          className="!border-transparent !bg-accent !text-white hover:!bg-accentHover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Running Query..." : "Run Query"}
        </Button>

        <Button
          type="button"
          disabled={isLoading}
          className="!border-border !bg-background !text-foreground hover:!bg-panel2/40 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={onReset}
        >
          Reset Form
        </Button>
      </div>
    </div>
  );
}
