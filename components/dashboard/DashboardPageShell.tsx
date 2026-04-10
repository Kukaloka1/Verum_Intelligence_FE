"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { ExecutivePulseHeader } from "./ExecutivePulseHeader";
import { JurisdictionStrip } from "./JurisdictionStrip";
import { PriorityAlertsRail } from "./PriorityAlertsRail";
import { RecentDevelopmentsFeed } from "./RecentDevelopmentsFeed";

export function DashboardPageShell() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background antialiased">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="absolute left-6 top-24 text-[8px] font-black uppercase tracking-[0.5em] text-muted/20 [writing-mode:vertical-lr]">
          LAT: 25.2048° N <span className="my-4">|</span> LON: 55.2708° E
        </div>
        <div className="absolute right-6 top-24 text-[8px] font-black uppercase tracking-[0.5em] text-muted/20 [writing-mode:vertical-lr]">
          SYS_STATUS: NOMINAL <span className="my-4">|</span> AUTH_ENCRYPTED
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1700px] px-4 pt-10 md:px-10 lg:px-16">
        <header className="mb-16 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-accent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
                Command Surface v4.0
              </span>
            </div>

            <PageHeader
              title="Compliance Intelligence"
              description="High-fidelity regulatory synthesis across MENA jurisdictions."
              className="!p-0"
            />
          </div>

          <div className="relative rounded-2xl border border-border/20 bg-panel/10 p-1 backdrop-blur-md transition-all hover:bg-panel/20">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-accent/20 to-transparent opacity-10 blur-xl" />
            <ExecutivePulseHeader />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <main className="flex flex-col gap-12 lg:col-span-8">
            <JurisdictionStrip />

            <section className="flex flex-col gap-8">
              <div className="flex items-end justify-between border-b border-border/30 pb-4">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-bold tracking-tighter text-foreground">
                    Intelligence Feed
                  </h2>
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted/50">
                    Live updates <span className="mx-1">/</span> Real-time synthesis
                  </span>
                </div>

                <div className="text-[10px] font-bold tabular-nums uppercase tracking-widest text-muted/40">
                  Updated: {new Date().toLocaleTimeString()}
                </div>
              </div>

              <RecentDevelopmentsFeed />
            </section>
          </main>

          <aside className="flex flex-col gap-8 lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              <div className="flex flex-col gap-6 rounded-2xl border border-border/20 bg-panel/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">
                    Critical Priority
                  </h2>
                </div>

                <PriorityAlertsRail />
              </div>

              <div className="hidden rounded-xl border border-border/10 p-4 opacity-40 lg:block">
                <div className="flex flex-col gap-2">
                  <div className="h-1 w-full rounded-full bg-border/30" />
                  <div className="h-1 w-[60%] rounded-full bg-border/30" />
                  <p className="text-[8px] font-mono leading-tight">
                    SEC_ENC_KEY_SHA256: 4F92...A102
                    <br />
                    NODE_SYNC: 99.98%
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <footer className="mt-20 border-t border-border/20 bg-panel/5 px-6 py-4">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-muted/30">
          <span>Verum Intelligence OS v4.0</span>
          <span>© 2026 Grounded AI Systems</span>
          <span>Latency: 42ms</span>
        </div>
      </footer>
    </div>
  );
}