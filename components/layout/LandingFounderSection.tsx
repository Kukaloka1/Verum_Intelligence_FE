import Image from "next/image";

const EXPERTISE = [
  {
    label: "Cross-Border M&A",
    detail: "$75M+ transactions executed across energy and tech sectors.",
  },
  {
    label: "Strategic Governance",
    detail: "ESG frameworks, Islamic Finance, and multi-jurisdictional compliance.",
  },
  {
    label: "Digital Law & Advocacy",
    detail: "Leading voice in anti-scam awareness and digital recruitment ethics.",
  },
];

const CREDENTIALS = [
  "MBA Candidate — UNSW Business School",
  "LL.B. — Business & Contract Law",
  "HarvardX · Contract Law",
  "UPenn · American Law",
];

export function LandingFounderSection() {
  return (
    <section className="relative bg-background py-32">

      <div className="mx-auto max-w-7xl px-6">

        {/* Eyebrow */}
        <div className="mb-16 flex items-center gap-3">
          <div className="h-px w-10 bg-accent" />
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-accent">
            The Firm · Leadership
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">

          {/* Photo column */}
          <div className="lg:col-span-4">
            <div className="relative">
              <div className="pointer-events-none absolute -left-3 -top-3 h-10 w-10 border-l border-t border-accent/20" />
              <div className="pointer-events-none absolute -bottom-3 -right-3 h-10 w-10 border-b border-r border-accent/20" />

              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/images/anisa.webp"
                  alt="Anissa Marissa — Founder & Group General Counsel, Verum Lavine & Co."
                  width={480}
                  height={560}
                  className="w-full object-cover object-top"
                  priority={false}
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
              </div>

              <div className="mt-6 border-l-2 border-accent/30 pl-4">
                <div className="text-base font-semibold tracking-tight text-foreground">
                  Anissa Marissa
                </div>
                <div className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-accent/70">
                  Founder & Group General Counsel
                </div>
                <div className="mt-0.5 text-[11px] text-muted/60">
                  Verum Lavine & Co.
                </div>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="flex flex-col justify-center lg:col-span-8">

            <p className="max-w-2xl text-base font-light leading-relaxed text-muted md:text-lg">
              Anissa Marissa is a strategic legal leader and entrepreneur with over{" "}
              <span className="font-medium text-foreground">15 years of international experience</span>{" "}
              across the UK, Middle East, and Southeast Asia. As the founder of Verum Lavine & Co.,
              she bridges the gap between complex legal frameworks and sustainable business growth.
            </p>

            <p className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-muted/70">
              Before founding Verum Lavine & Co., Anissa served as General Counsel for international
              energy groups in London, managing legal operations across{" "}
              <span className="text-foreground/80">12+ jurisdictions</span>. Her background combines
              high-level legal counsel with People & Culture management — building organizations that
              are both legally robust and human-centric.
            </p>

            {/* Core expertise */}
            <div className="mt-12">
              <div className="mb-5 text-[9px] font-bold uppercase tracking-[0.35em] text-muted/40">
                Core Expertise
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                {EXPERTISE.map((item) => (
                  <div key={item.label} className="border-l border-accent/20 pl-4">
                    <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-accent/80">
                      {item.label}
                    </div>
                    <p className="text-[12px] font-light leading-relaxed text-muted/60">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Credentials */}
            <div className="mt-10">
              <div className="mb-4 text-[9px] font-bold uppercase tracking-[0.35em] text-muted/40">
                Education & Credentials
              </div>
              <div className="flex flex-wrap gap-2">
                {CREDENTIALS.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-border bg-panel/40 px-3 py-1.5 text-[11px] font-medium text-muted/70"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Quote */}
            <blockquote className="mt-10 border-l-2 border-accent/30 pl-5">
              <p className="text-sm font-light italic leading-relaxed text-muted/60">
                "Empowering businesses through integrity, strategic foresight, and resilient legal foundations."
              </p>
            </blockquote>

          </div>
        </div>
      </div>
    </section>
  );
}
