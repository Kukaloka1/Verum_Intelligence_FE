export function AppTopbar() {
  return (
    <header className="flex items-center justify-between border-b border-border bg-background px-4 py-3 md:px-6 md:py-4">
      {/* Mobile: brand mark (sidebar is hidden on small screens) */}
      <div className="flex items-center gap-2.5 md:hidden">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-xs font-black text-white">
          V
        </div>
        <span className="text-sm font-bold tracking-tight text-foreground">Verum Intelligence</span>
      </div>
      {/* Desktop: contextual subtitle */}
      <div className="hidden text-sm text-muted md:block">
        Premium GCC regulatory intelligence workspace
      </div>
      <div className="rounded-lg border border-border px-3 py-1 text-xs font-medium text-muted">
        Demo Build
      </div>
    </header>
  );
}
