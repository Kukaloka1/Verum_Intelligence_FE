import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

function IconLinkedin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

const FOOTER_LINKS = {
  Product: [
    { label: "AI Query Interface", href: ROUTES.query },
    { label: "Compliance Dashboard", href: ROUTES.dashboard },
    { label: "Framework Comparison", href: ROUTES.comparison },
    { label: "Market Entry Toolkit", href: ROUTES.toolkit },
    { label: "Workspace", href: ROUTES.workspace },
  ],
  Jurisdictions: [
    { label: "DIFC", href: "/#jurisdictions" },
    { label: "ADGM", href: "/#jurisdictions" },
    { label: "QFC", href: "/#jurisdictions" },
    { label: "KSA", href: "/#jurisdictions" },
  ],
  "The Firm": [
    { label: "About", href: ROUTES.about },
  ],
  Account: [
    { label: "Sign in", href: ROUTES.login },
    { label: "Create account", href: ROUTES.signup },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="relative border-t border-border/40 bg-surfaceDark overflow-hidden pt-24 pb-12">

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">

        {/* ── Main grid — both columns flex-col justify-between so logos pin to bottom ── */}
        <div className="mb-20 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-stretch">

          {/* ── Brand column ── */}
          <div className="flex flex-col justify-between gap-12 lg:col-span-5">

            {/* Top: brand identity + socials */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-lg font-black text-white shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]">
                  V
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-white">Verum Intelligence</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">GCC Legal Intelligence Platform</p>
                </div>
              </div>

              <p className="max-w-md text-base font-light leading-relaxed text-white/85">
                Premium GCC regulatory intelligence workspace for founders, investors, and legal teams.
                Built for clarity in the most complex markets.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <a href="https://www.instagram.com/verumlavineandco/" target="_blank" rel="noreferrer" className="text-white/80 transition-[color] duration-200 hover:text-accent">
                  <IconInstagram />
                </a>
                <a href="https://www.linkedin.com/company/verum-lavine-co/" target="_blank" rel="noreferrer" className="text-white/80 transition-[color] duration-200 hover:text-accent">
                  <IconLinkedin />
                </a>
                <a href="mailto:verumlavineandco@gmail.com" className="flex items-center gap-2 text-xs font-medium tracking-wide text-white/80 transition-[color] duration-200 hover:text-accent">
                  <IconMail />
                  verumlavineandco@gmail.com
                </a>
              </div>
            </div>

            {/* Bottom: Verum logo — pinned to base of column */}
            <div className="border-t border-white/[0.06] pt-8">
              <Image
                src="/logos/logob.webp"
                alt="Verum Lavine & Co. official logo"
                width={640}
                height={240}
                className="h-64 w-auto object-contain opacity-90"
              />
            </div>
          </div>

          {/* ── Links + Bittechnetwork column ── */}
          <div className="flex flex-col justify-between gap-12 lg:col-span-7">

            {/* Top: navigation links */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              {Object.entries(FOOTER_LINKS).map(([group, links]) => (
                <div key={group} className="flex flex-col gap-5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/85">
                    {group}
                  </div>
                  <ul className="flex flex-col gap-3">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[13px] font-medium text-white/60 transition-[transform,color] duration-200 hover:translate-x-1 hover:text-accent inline-block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom: Bittechnetwork credit — pinned to base of column, desktop only */}
            <div className="hidden lg:flex border-t border-white/[0.06] pt-8 flex-col items-center gap-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/25">
                Developed &amp; powered by
              </span>
              <a
                href="https://www.bittechnetwork.com/"
                target="_blank"
                rel="noreferrer"
                className="transition-opacity duration-200 hover:opacity-80"
              >
                <Image
                  src="/logos/bit.svg"
                  alt="Bittechnetwork"
                  width={360}
                  height={120}
                  className="h-36 w-auto object-contain opacity-50"
                />
              </a>
            </div>
          </div>
        </div>

        {/* ── Signature section ── */}
        <div className="border-t border-border/30 pt-16">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:items-end">

            <div className="flex flex-col gap-6 text-center lg:text-left">
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Ownership &amp; Jurisdiction</p>
                <p className="max-w-sm text-[12px] font-medium leading-relaxed text-white/70">
                  Verum Lavine &amp; Co. operates under{" "}
                  <span className="text-white/90">PT WriteLife Group Inovasi</span>,{" "}
                  <br />Jakarta, Indonesia.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white/60 lg:justify-start">
                <span>Private &amp; Confidential</span>
                <span className="h-3 w-px bg-border/40" />
                <span>Regulatory Intelligence v2.0</span>
                <span className="h-3 w-px bg-border/40" />
                <span>© {new Date().getFullYear()}</span>
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[120px] font-black tracking-tighter text-white/[0.02] lg:-left-20 lg:translate-x-0">
                VERUM
              </div>
              <div className="relative z-10 text-right">
                <div className="mb-2 text-[10px] font-black uppercase tracking-[0.5em] text-white/70">
                  Official Signature
                </div>
                <div className="text-3xl font-light tracking-[-0.03em] text-white md:text-5xl lg:text-6xl">
                  VERUM <span className="font-serif italic text-white/95">Lavine &amp; Co.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bittechnetwork credit — below signature, centered, hidden on desktop */}
        <div className="lg:hidden mt-16 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-10">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/25">
            Developed &amp; powered by
          </span>
          <a
            href="https://www.bittechnetwork.com/"
            target="_blank"
            rel="noreferrer"
            className="transition-opacity duration-200 hover:opacity-80"
          >
            <Image
              src="/logos/bit.svg"
              alt="Bittechnetwork"
              width={360}
              height={120}
              className="h-36 w-auto object-contain opacity-50"
            />
          </a>
        </div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
      </div>
    </footer>
  );
}
