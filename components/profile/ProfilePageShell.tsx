import { PageHeader } from "@/components/layout/PageHeader";
import { ProfileSummaryCard } from "./ProfileSummaryCard";

export function ProfilePageShell() {
  return (
    <div>
      <PageHeader title="Profile" description="Account and session context." />
      <ProfileSummaryCard />
    </div>
  );
}
