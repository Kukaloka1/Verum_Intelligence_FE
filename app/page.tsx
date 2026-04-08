import Link from "next/link";
import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { HeroSection } from "@/components/layout/HeroSection";
import { MarketingSection } from "@/components/layout/MarketingSection";
import { MarketingFooter } from "@/components/layout/MarketingFooter";
import { Card } from "@/components/shared/Card";
import { ROUTES } from "@/lib/constants/routes";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-white">
      <MarketingHeader />
      <HeroSection />

      <MarketingSection
        id="who-we-are"
        eyebrow="Who we are"
        title="A focused regulatory intelligence product for GCC navigation."
        description="Verum Intelligence is designed for teams that need clarity across regulatory frameworks, jurisdiction choices, and early market-entry decisions."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <div className="text-lg font-medium">Founders</div>
            <p className="mt-2 text-sm text-white/65">
              Evaluate regulatory paths before committing to a market-entry direction.
            </p>
          </Card>
          <Card>
            <div className="text-lg font-medium">Investors</div>
            <p className="mt-2 text-sm text-white/65">
              Compare regulatory environments with more structure and less noise.
            </p>
          </Card>
          <Card>
            <div className="text-lg font-medium">Legal teams</div>
            <p className="mt-2 text-sm text-white/65">
              Explore source-backed answers, jurisdiction context, and structured comparison.
            </p>
          </Card>
        </div>
      </MarketingSection>

      <MarketingSection
        id="what-we-do"
        eyebrow="What we do"
        title="Five product surfaces, one premium intelligence workspace."
        description="The platform is built around clear product modules that map directly to the client brief."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Card>
            <div className="text-lg font-medium">AI Query Interface</div>
            <p className="mt-2 text-sm text-white/65">
              Ask compliance and regulatory questions in plain English and receive structured, citable answers.
            </p>
          </Card>
          <Card>
            <div className="text-lg font-medium">Compliance Dashboard</div>
            <p className="mt-2 text-sm text-white/65">
              Monitor jurisdiction-level updates, alerts, and tracking signals across core GCC markets.
            </p>
          </Card>
          <Card>
            <div className="text-lg font-medium">Framework Comparison</div>
            <p className="mt-2 text-sm text-white/65">
              Compare licensing requirements, frameworks, and regulatory standards side by side.
            </p>
          </Card>
          <Card>
            <div className="text-lg font-medium">Market Entry Toolkit</div>
            <p className="mt-2 text-sm text-white/65">
              Review roadmap-style guidance, indicative timing, and structured caveats by jurisdiction.
            </p>
          </Card>
          <Card>
            <div className="text-lg font-medium">User Workspace</div>
            <p className="mt-2 text-sm text-white/65">
              Save queries, return to work, and operate inside a real SaaS-style product environment.
            </p>
          </Card>
        </div>
      </MarketingSection>

      <MarketingSection
        id="why-verum"
        eyebrow="Why Verum"
        title="Built for clarity, not AI theater."
        description="The product is designed around source-backed intelligence, structured navigation, and serious product UX."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <div className="text-lg font-medium">Source-backed</div>
            <p className="mt-2 text-sm text-white/65">
              The product direction prioritizes traceability, citations, and regulatory source visibility.
            </p>
          </Card>
          <Card>
            <div className="text-lg font-medium">Jurisdiction-aware</div>
            <p className="mt-2 text-sm text-white/65">
              Navigate DIFC, ADGM, QFC, and KSA with product surfaces designed for comparison and monitoring.
            </p>
          </Card>
          <Card>
            <div className="text-lg font-medium">Premium workspace</div>
            <p className="mt-2 text-sm text-white/65">
              A product-first experience built for repeated use, not just one-off queries.
            </p>
          </Card>
        </div>
      </MarketingSection>

      <MarketingSection
        id="jurisdictions"
        eyebrow="Jurisdictions"
        title="Focused on the GCC regulatory surfaces that matter first."
        description="The initial product story is centered on DIFC, ADGM, QFC, and KSA."
      >
        <div className="grid gap-4 md:grid-cols-4">
          <Card><div className="text-xl font-medium">DIFC</div></Card>
          <Card><div className="text-xl font-medium">ADGM</div></Card>
          <Card><div className="text-xl font-medium">QFC</div></Card>
          <Card><div className="text-xl font-medium">KSA</div></Card>
        </div>
      </MarketingSection>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Card className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="text-2xl font-semibold">See the product direction now.</div>
            <p className="mt-2 max-w-2xl text-sm text-white/65">
              Explore the first-pass Verum Intelligence frontend and move through the core product surfaces.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href={ROUTES.query}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-950"
            >
              Open AI Query
            </Link>
            <Link
              href={ROUTES.dashboard}
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/80 hover:bg-white/10"
            >
              Open Dashboard
            </Link>
          </div>
        </Card>
      </section>

      <MarketingFooter />
    </main>
  );
}
