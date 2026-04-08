import { PageHeader } from "@/components/layout/PageHeader";
import { ExecutivePulseHeader } from "./ExecutivePulseHeader";
import { JurisdictionStrip } from "./JurisdictionStrip";
import { PriorityAlertsRail } from "./PriorityAlertsRail";
import { RecentDevelopmentsFeed } from "./RecentDevelopmentsFeed";

export function DashboardPageShell() {
  return (
    <div className="space-y-5 text-foreground md:space-y-6">
      <PageHeader
        title="Compliance Dashboard"
        description="Source-backed regulatory monitoring across DIFC, ADGM, QFC, and KSA."
      />
      <ExecutivePulseHeader />
      <JurisdictionStrip />
      <PriorityAlertsRail />
      <RecentDevelopmentsFeed />
    </div>
  );
}
