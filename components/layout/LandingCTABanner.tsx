"use client";

import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

export function LandingCTABanner() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32">
      <div className="relative overflow-hidden rounded-[3rem] border border-white/[0.08] bg-surfaceDark px-8 py-24 md:px-20 md:py-32">

        {/* Subtle dot grid — pure CSS, no external fetch, no blend mode */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Rim lights */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

        {/* Corner brackets */}
        <div className="pointer-events-none absolute left-8 top-8 h-8 w-8 border-l border-t border-white/10" />
        <div className="pointer-events-none absolute right-8 bottom-8 h-8 w-8 border-r border-b border-white/10" />

        <div className="relative z-10 flex flex-col items-center text-center">

          <div className="mb-8 flex items-center gap-4">
            <div className="h-px w-6 bg-accent/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">
              Access Protocol // Ready to navigate the GCC?
            </span>
            <div className="h-px w-6 bg-accent/40" />
          </div>

          <h2 className="mb-8 max-w-3xl text-balance text-4xl font-medium leading-[1.05] tracking-tighter text-background md:text-6xl lg:text-7xl">
            Explore the product <br className="hidden md:block" />
            <span className="text-white/40">direction now.</span>
          </h2>

          <p className="mb-14 max-w-xl text-balance text-base font-light leading-relaxed text-background/60 md:text-lg">
            Move through the core product surfaces —{" "}
            <span className="text-background/80">AI Query</span>,{" "}
            <span className="text-background/80">Compliance Dashboard</span>,{" "}
            <span className="text-background/80">Framework Comparison</span>, and{" "}
            <span className="text-background/80">Market Entry Toolkit</span>.
          </p>

          <div className="flex flex-col items-center gap-8">
            <Link
              href={ROUTES.login}
              className="group relative flex items-center justify-center overflow-hidden rounded-2xl bg-accent px-12 py-5 text-sm font-bold uppercase tracking-widest text-white transition-[background-color,transform] duration-200 hover:scale-[1.02] hover:bg-accentHover active:scale-[0.98]"
            >
              <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
              <span className="relative z-10 flex items-center gap-4">
                Sign In to Verum Intelligence
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>

            <div className="flex items-center gap-4 rounded-full border border-white/5 bg-black/20 px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">System Online</span>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">
                Enterprise-grade secure access
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
