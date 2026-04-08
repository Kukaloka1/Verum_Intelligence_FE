"use client";

export function AppTopbar() {
  return (
    <header className="flex items-center justify-between border-b border-border bg-background px-4 py-3 md:px-6 md:py-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 md:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-sm font-black text-background">
            V
          </div>

          <div className="flex flex-col">
            <span className="leading-none text-sm font-semibold tracking-tight text-foreground">
              Verum
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-accent">
              Intelligence
            </span>
          </div>
        </div>

        <div className="hidden md:block">
          <p className="text-sm font-medium text-muted">
            Premium GCC regulatory intelligence workspace
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-panel px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Demo Build
          </span>
        </div>
      </div>
    </header>
  );
}
