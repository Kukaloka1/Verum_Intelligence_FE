import { PageHeader } from "@/components/layout/PageHeader";
import { ToolkitOverview } from "./ToolkitOverview";
import { ToolkitRoadmap } from "./ToolkitRoadmap";

export function ToolkitPageShell() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Market Entry Toolkit"
        description="Structured market-entry guidance by jurisdiction."
      />
      <ToolkitOverview />
      <ToolkitRoadmap />
    </div>
  );
}
