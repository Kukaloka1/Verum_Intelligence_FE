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
    { label: "DIFC", href: "#jurisdictions" },
    { label: "ADGM", href: "#jurisdictions" },
    { label: "QFC", href: "#jurisdictions" },
    { label: "KSA", href: "#jurisdictions" },
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
    <footer className="relative border-t border-border/40 bg-surfaceDark pt-24 pb-12 overflow-hidden">
      
      {/* Luz ambiental sutil en el fondo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        
        {/* Main Grid */}
        <div className="mb-20 grid grid-cols-1 gap-16 lg:grid-cols-12">
          
          {/* Brand & Mission Surface */}
          <div className="lg:col-span-5 flex flex-col justify-between">
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

              {/* Socials & Contact - Limpieza absoluta */}
              <div className="flex items-center gap-6 pt-4">
                <a 
                  href="https://www.instagram.com/verumlavineandco/" 
                  target="_blank" 
                  className="text-white/80 transition-colors hover:text-accent"
                >
                  <IconInstagram />
                </a>
                <a 
                  href="https://www.linkedin.com/company/verum-lavine-co/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnUEo2sac7KUaFxZWmqV_MQ2CkMVXnMnxWDGaQIx14AN_TnZubYJRmjkEgvVs_aem_cU5Z8e7pfM4gYp9ynx0ZmQ" 
                  target="_blank" 
                  className="text-white/80 transition-colors hover:text-accent"
                >
                  <IconLinkedin />
                </a>
                <a 
                  href="mailto:verumlavineandco@gmail.com" 
                  className="flex items-center gap-2 text-xs font-medium tracking-wide text-white/80 transition-colors hover:text-accent"
                >
                  <IconMail />
                  verumlavineandco@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Links Groups - Estilo Vertical List */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group} className="flex flex-col gap-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/85">
                  {group}
                </div>
                <ul className="flex flex-col gap-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] font-medium text-white/70 transition-[transform,color] duration-200 hover:translate-x-1 hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* The "Power Signature" Section */}
        <div className="border-t border-border/30 pt-16">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:items-end">
            
            {/* Legal Information Section */}
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Ownership & Jurisdiction</p>
                <p className="max-w-sm text-[12px] font-medium leading-relaxed text-white/70">
                  Verum Lavine & Co. operates under <span className="text-white/90">PT WriteLife Group Inovasi</span>, 
                  <br />Jakarta, Indonesia.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white/60 lg:justify-start">
                <span>Private & Confidential</span>
                <span className="h-3 w-px bg-border/40" />
                <span>Regulatory Intelligence v2.0</span>
                <span className="h-3 w-px bg-border/40" />
                <span>© {new Date().getFullYear()}</span>
              </div>
            </div>

            {/* BIG SIGNATURE - El Momento WOW */}
            <div className="relative">
              <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[120px] font-black tracking-tighter text-white/[0.02] lg:-left-20 lg:translate-x-0">
                VERUM
              </div>
              <div className="relative z-10 text-right">
                <div className="mb-2 text-[10px] font-black uppercase tracking-[0.5em] text-white/70">
                  Official Signature
                </div>
                <div className="text-3xl font-light tracking-[-0.03em] text-white md:text-5xl lg:text-6xl">
                  VERUM <span className="font-serif italic text-white/95">Lavine & Co.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Line */}
        <div className="mt-20 h-1 w-full bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
      </div>
    </footer>
  );
}
