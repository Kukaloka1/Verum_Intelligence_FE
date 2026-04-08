import { Card } from "@/components/shared/Card";

export function DevelopmentFeedItem() {
  return (
    <Card>
      <div className="text-sm text-white/50">QFC · Notice · 2026-04-07</div>
      <div className="mt-2 text-lg font-medium">Recent regulatory notice headline</div>
      <p className="mt-2 text-sm text-white/65">
        Structured summary with traceable source context and “why this matters” framing.
      </p>
    </Card>
  );
}
