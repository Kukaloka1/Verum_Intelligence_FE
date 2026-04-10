"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { ComparisonSelector } from "./ComparisonSelector";
import { ComparisonTable } from "./ComparisonTable";

export function ComparisonPageShell() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="absolute left-4 top-28 hidden text-[8px] font-black uppercase tracking-[0.5em] text-muted/20 [writing-mode:vertical-lr] lg:block">
          COMPARISON_MODE <span className="my-4">|</span> CROSS_REFERENCE
        </div>

        <div className="absolute right-4 top-28 hidden text-[8px] font-black uppercase tracking-[0.5em] text-muted/20 [writing-mode:vertical-lr] lg:block">
          MATRIX_VIEW <span className="my-4">|</span> GROUNDED_SCOPE
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1700px] space-y-8 px-4 pt-8 md:space-y-10 md:px-8 lg:px-12">
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-accent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-accent">
              Comparison Surface
            </span>
          </div>

          <PageHeader
            title="Framework Comparison"
            description="Side-by-side comparison across GCC jurisdictions."
          />
        </header>

        <section className="rounded-2xl border border-border/20 bg-panel/10 p-3 backdrop-blur-sm md:p-4">
          <ComparisonSelector />
        </section>

        <main className="rounded-3xl border border-border/20 bg-panel/5 p-4 md:p-6 lg:p-8">
          <ComparisonTable />
        </main>
      </div>
    </div>
  );
}