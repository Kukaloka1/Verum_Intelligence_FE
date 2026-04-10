import { Card } from "@/components/shared/Card";

export function DevelopmentFeedItem() {
  return (
    <Card className="group relative overflow-hidden border-border/50 bg-panel/10 p-0 transition-colors duration-200 hover:border-border hover:bg-panel/20">
      <div className="flex flex-col gap-4 p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            QFC
          </span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            Notice
          </span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span className="text-[10px] font-medium tracking-[0.14em] text-muted">
            2026-04-07
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium leading-snug tracking-tight text-foreground md:text-xl">
            Recent regulatory notice headline
          </div>
          <p className="max-w-[72ch] text-sm leading-7 text-muted">
            Structured summary with traceable source context and “why this matters” framing.
          </p>
        </div>
      </div>

      <div className="h-px w-full bg-border/40" />
    </Card>
  );
}