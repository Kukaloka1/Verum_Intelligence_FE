import { Card } from "@/components/shared/Card";

export function DevelopmentFeedItem() {
  return (
    <Card>
      <div className="text-sm text-muted">QFC · Notice · 2026-04-07</div>
      <div className="mt-2 text-lg font-medium text-foreground">
        Recent regulatory notice headline
      </div>
      <p className="mt-2 text-sm text-muted">
        Structured summary with traceable source context and “why this matters” framing.
      </p>
    </Card>
  );
}
