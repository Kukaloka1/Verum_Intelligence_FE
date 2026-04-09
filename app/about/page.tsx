import type { Metadata } from "next";
import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { LandingFounderSection } from "@/components/layout/LandingFounderSection";
import { MarketingFooter } from "@/components/layout/MarketingFooter";

export const metadata: Metadata = {
  title: "The Firm — Verum Lavine & Co.",
  description:
    "Verum Lavine & Co. is a premier GCC regulatory intelligence firm. Meet the founder and leadership behind the platform.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <MarketingHeader />

      {/* Page header */}
      <section className="pt-40 pb-16 mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-accent" />
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-accent">
            Verum Lavine & Co.
          </span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
          The Firm
        </h1>
        <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-muted">
          Built on 15 years of cross-border legal experience. Focused on the GCC
          regulatory surfaces that define how capital moves and businesses operate.
        </p>
      </section>

      <LandingFounderSection />

      <MarketingFooter />
    </main>
  );
}
