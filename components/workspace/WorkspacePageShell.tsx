import { PageHeader } from "@/components/layout/PageHeader";
import { WorkspaceOverview } from "./WorkspaceOverview";

export function WorkspacePageShell() {
  return (
    <div>
      <PageHeader
        title="User Workspace"
        description="Saved queries, continuity, and personal product usage."
      />
      <WorkspaceOverview />
    </div>
  );
}
