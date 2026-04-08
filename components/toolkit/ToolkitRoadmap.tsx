import { ToolkitStepCard } from "./ToolkitStepCard";

export function ToolkitRoadmap() {
  return (
    <div className="space-y-4">
      <ToolkitStepCard step={1} title="Define target activity and licensing scope" />
      <ToolkitStepCard step={2} title="Prepare jurisdiction-specific requirements" />
      <ToolkitStepCard step={3} title="Review submission and regulator-facing steps" />
    </div>
  );
}
