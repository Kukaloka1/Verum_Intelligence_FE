import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-surfaceDark">
      {/* 1. Hero background image — GPU-composited */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/jakarta.webp"
          alt="Jakarta skyline"
          fill
          priority
          className="object-cover object-center opacity-60"
          sizes="100vw"
        />
      </div>

      {/* 2. Single consolidated overlay — one paint layer instead of two */}
      <div className="absolute inset-0 z-10 bg-[#0A0806]/70" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A0806] via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pb-24 pt-32">
        
        {/* Eyebrow - Estilo Badge de hardware de Apple */}
        <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-[11px] font-medium tracking-[0.06em] text-white/70">
            AI-powered GCC regulatory intelligence
          </span>
        </div>

        {/* Headline - Tracking ajustado y contraste dramático */}
        <h1 className="max-w-5xl text-5xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          Navigate GCC
          <br />
          regulatory complexity
          <br />
          <span className="text-white/30">
            with AI precision.
          </span>
        </h1>

        {/* Sub - Ancho controlado y color balanceado */}
        <p className="mt-8 max-w-2xl text-base font-light leading-relaxed tracking-wide text-white/50 md:text-lg">
          Verum Intelligence gives founders, legal teams, and market-entry
          operators source-backed regulatory answers across DIFC, ADGM, QFC,
          and KSA — in one premium workspace.
        </p>

        {/* CTAs - Diseño de botón ultra premium con sombras interiores */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href={ROUTES.query}
            className="group relative inline-flex items-center gap-2.5 rounded-xl border border-accent/50 bg-accent px-7 py-3.5 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_2px_12px_rgba(var(--accent-rgb),0.25)] transition-[background-color,box-shadow] duration-300 hover:bg-accentHover hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_4px_24px_rgba(var(--accent-rgb),0.4)]"
          >
            Explore AI Query
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
          
          <Link
            href={ROUTES.dashboard}
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-7 py-3.5 text-sm font-medium text-white/70 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] transition-[background-color,color] duration-300 hover:bg-white/[0.06] hover:text-white"
          >
            View Dashboard
          </Link>
        </div>

        {/* Trust bar - Ticker técnico, alineación perfecta y separadores tenues */}
        <div className="mt-24 flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/[0.06] pt-8">
          {["DIFC", "ADGM", "QFC", "KSA"].map((j, i) => (
            <span
              key={j}
              className="flex items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30"
            >
              {i > 0 && (
                <span className="h-0.5 w-1 rounded-full bg-white/10" aria-hidden="true" />
              )}
              {j}
            </span>
          ))}
          
          <span className="mx-2 h-3 w-px bg-white/[0.08]" aria-hidden="true" />
          
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
            Source-backed
          </span>
          <span className="h-0.5 w-1 rounded-full bg-white/10" aria-hidden="true" />
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
            Jakarta, Indonesia
          </span>
        </div>
      </div>
    </section>
  );
}