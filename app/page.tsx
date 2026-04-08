import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { HeroSection } from "@/components/layout/HeroSection";
import { LandingAudienceSection } from "@/components/layout/LandingAudienceSection";
import { LandingModulesSection } from "@/components/layout/LandingModulesSection";
import { LandingWhySection } from "@/components/layout/LandingWhySection";
import { LandingJurisdictionsSection } from "@/components/layout/LandingJurisdictionsSection";
import { LandingCTABanner } from "@/components/layout/LandingCTABanner";
import { MarketingFooter } from "@/components/layout/MarketingFooter";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-white">
      <MarketingHeader />
      <HeroSection />
      <LandingAudienceSection />
      <LandingModulesSection />
      <LandingWhySection />
      <LandingJurisdictionsSection />
      <LandingCTABanner />
      <MarketingFooter />
    </main>
  );
}
