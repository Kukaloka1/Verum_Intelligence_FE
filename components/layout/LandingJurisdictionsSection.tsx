const JURISDICTIONS = [
  {
    code: "DIFC",
    name: "Dubai International Financial Centre",
    authority: "DFSA",
    location: "Dubai, UAE",
    detail:
      "Independent legal system and regulatory framework within Dubai. Common law jurisdiction with its own civil and commercial laws.",
    tags: ["Financial services", "Common law", "DFSA regulated"],
  },
  {
    code: "ADGM",
    name: "Abu Dhabi Global Market",
    authority: "FSRA",
    location: "Abu Dhabi, UAE",
    detail:
      "International financial centre with English common law foundation. Regulated by the Financial Services Regulatory Authority.",
    tags: ["Financial services", "Common law", "FSRA regulated"],
  },
  {
    code: "QFC",
    name: "Qatar Financial Centre",
    authority: "QFCRA",
    location: "Doha, Qatar",
    detail:
      "Onshore financial and business centre operating under its own regulatory framework. English common law principles apply within the QFC.",
    tags: ["Financial services", "Common law", "QFCRA regulated"],
  },
  {
    code: "KSA",
    name: "Kingdom of Saudi Arabia",
    authority: "SAMA / CMA",
    location: "Riyadh, KSA",
    detail:
      "Largest GCC economy with dual regulatory oversight from SAMA for banking and insurance and CMA for capital markets and investment.",
    tags: ["Banking", "Capital markets", "Vision 2030"],
  },
];

export function LandingJurisdictionsSection() {
  return (
    <section id="jurisdictions" className="relative mx-auto max-w-7xl px-6 py-32">
      
      {/* Header - Alineación de precisión técnica */}
      <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="h-[1px] w-12 bg-border" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted/60">
              Jurisdictions
            </span>
          </div>
          <h2 className="max-w-xl text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-5xl">
            Focused on the GCC regulatory surfaces <span className="text-muted/40 italic">that matter first.</span>
          </h2>
        </div>
        <p className="max-w-[280px] border-l border-border pl-6 text-[13px] font-light leading-relaxed text-muted">
          Initial coverage centered on the four primary GCC financial and regulatory jurisdictions.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {JURISDICTIONS.map((j) => (
          <div
            key={j.code}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-panel p-6 transition-all duration-500 ease-out hover:border-accent/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
          >
            {/* Lámpara de acento superior (Top Glow) */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Juris Code + Location Header */}
            <div className="mb-8 flex items-start justify-between">
              <div className="relative">
                <div className="text-xs font-bold tracking-[0.2em] text-accent/60 mb-1">CODE.SYS</div>
                <div className="text-4xl font-bold tracking-tighter text-foreground transition-transform duration-500 group-hover:scale-[1.02] origin-left">
                  {j.code}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="rounded-full bg-foreground/[0.03] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted/50 border border-border/50">
                  Active
                </div>
                <div className="text-[10px] font-medium text-muted/40 uppercase tracking-tight">
                  {j.location}
                </div>
              </div>
            </div>

            {/* Name & Detail - Typography focus */}
            <div className="mb-6 space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-foreground/80">
                {j.name}
              </div>
              <p className="text-[13px] leading-relaxed text-muted/70 group-hover:text-muted transition-colors">
                {j.detail}
              </p>
            </div>

            {/* Metadata Footer */}
            <div className="mt-auto pt-6">
              <div className="mb-4 flex flex-col gap-1.5 border-t border-border/50 pt-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted/30">
                  Regulatory Authority
                </span>
                <span className="text-xs font-medium text-foreground/90">
                  {j.authority}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {j.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-foreground/[0.02] border border-border/60 px-2 py-0.5 text-[10px] font-medium text-muted/60 transition-all group-hover:border-border group-hover:text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Efecto de ruido sutil interno solo en hover */}
            <div className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-[0.03]" 
                 style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
          </div>
        ))}
      </div>
    </section>
  );
}