import { SectionHeader } from "@/components/layout/SectionHeader";
import { AlertCard } from "./AlertCard";

export function PriorityAlertsRail() {
  return (
    <div className="text-foreground">
      <SectionHeader title="Priority Alerts" />
      <div className="grid gap-4 lg:grid-cols-2">
        <AlertCard />
        <AlertCard />
      </div>
    </div>
  );
}
