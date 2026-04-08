import { Card } from "@/components/shared/Card";

export function ToolkitStepCard({
  step,
  title
}: {
  step: number;
  title: string;
}) {
  return (
    <Card>
      <div className="text-sm text-white/50">Step {step}</div>
      <div className="mt-2 text-lg font-medium">{title}</div>
      <p className="mt-2 text-sm text-white/65">Indicative guidance only. Actual requirements vary by activity and regulator.</p>
    </Card>
  );
}
