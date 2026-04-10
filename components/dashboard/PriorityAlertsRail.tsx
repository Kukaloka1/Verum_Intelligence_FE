import { SectionHeader } from "@/components/layout/SectionHeader";
import { AlertCard } from "./AlertCard";

export function PriorityAlertsRail() {
  return (
    <section className="relative flex flex-col gap-6 text-foreground">
      <div className="flex items-center justify-between px-1">
        <SectionHeader title="Priority Alerts" />
      </div>

      <div className="relative grid gap-4 lg:grid-cols-2">
        <div className="pointer-events-none absolute -inset-4 bg-accent/[0.02] blur-3xl" />
        <AlertCard />
        <AlertCard />
      </div>
    </section>
  );
}
