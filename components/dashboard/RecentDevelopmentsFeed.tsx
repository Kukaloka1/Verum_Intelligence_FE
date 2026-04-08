import { SectionHeader } from "@/components/layout/SectionHeader";
import { DevelopmentFeedItem } from "./DevelopmentFeedItem";

export function RecentDevelopmentsFeed() {
  return (
    <div>
      <SectionHeader title="Recent Developments" />
      <div className="space-y-4">
        <DevelopmentFeedItem />
        <DevelopmentFeedItem />
        <DevelopmentFeedItem />
      </div>
    </div>
  );
}
