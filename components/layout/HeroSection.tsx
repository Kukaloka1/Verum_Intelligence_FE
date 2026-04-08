import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-4xl">
        <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
          AI-powered GCC regulatory intelligence
        </div>

        <h1 className="text-5xl font-semibold leading-tight text-white md:text-6xl">
          Premium regulatory intelligence for GCC market entry and decision-making.
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-white/70">
          Verum Intelligence helps founders, investors, legal teams, and market-entry operators
          explore GCC regulatory frameworks, compare jurisdictions, and work from source-backed answers.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={ROUTES.query}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-950"
          >
            Explore AI Query
          </Link>
          <Link
            href={ROUTES.dashboard}
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/80 hover:bg-white/10"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
