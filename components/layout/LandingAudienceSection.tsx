const AUDIENCES = [
  {
    index: "01",
    label: "Founders",
    description:
      "Evaluate regulatory paths before committing to a market-entry direction. Understand the real cost and complexity of each jurisdiction — before hiring a lawyer.",
    tags: ["Licensing clarity", "Pre-entry research", "Jurisdiction selection"],
  },
  {
    index: "02",
    label: "Investors",
    description:
      "Compare regulatory environments with structure, not noise. Get source-backed context on portfolio companies navigating the GCC regulatory landscape.",
    tags: ["Portfolio context", "Risk framing", "Framework comparison"],
  },
  {
    index: "03",
    label: "Legal teams",
    description:
      "Explore source-backed answers, jurisdiction frameworks, and structured comparison — without the back-and-forth of manual research across fragmented sources.",
    tags: ["Source traceability", "Citation-backed", "Structured output"],
  },
];

export function LandingAudienceSection() {
  return (
    <section id="audience" className="relative mx-auto max-w-7xl px-6 py-32">
      
      {/* Luz cenital de separación (Efecto Vercel) */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />

      {/* Section header */}
      <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex-1">
          {/* Eyebrow - Transformado a un micro-badge premium */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border bg-panel px-3.5 py-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              Who it's for
            </span>
          </div>
          
          <h2 className="max-w-2xl text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-foreground md:text-5xl">
            Built for the teams navigating the GCC regulatory surface.
          </h2>
        </div>
        
        <p className="max-w-sm text-sm font-light leading-relaxed text-muted md:text-right">
          Verum Intelligence is a focused tool — designed for teams where
          regulatory clarity has direct commercial consequences.
        </p>
      </div>

      {/* Audience cards - Bento Box Grid Real */}
      <div className="grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border shadow-2xl shadow-black/10 md:grid-cols-3">
        {AUDIENCES.map((a) => (
          <div
            key={a.index}
            className="group relative flex flex-col bg-panel p-8 md:p-10 transition-colors duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-panel2/50"
          >
            {/* Sombra interior superior para efecto de cristal opaco */}
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]" />

            {/* Número Marca de Agua (Parallax sutil) */}
            <div className="absolute -right-4 -top-8 select-none text-[8rem] font-bold leading-none tracking-tighter text-foreground/[0.03] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-x-2 group-hover:translate-y-2">
              {a.index}
            </div>

            {/* Contenido (z-10 para estar sobre la marca de agua) */}
            <div className="relative z-10 flex h-full flex-col">
              
              {/* Header de la tarjeta */}
              <div className="mb-6 flex items-center gap-4">
                {/* Index convertido en un micro-icono */}
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-foreground/[0.02] text-[11px] font-semibold text-muted shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
                  {a.index}
                </div>
                <h3 className="text-xl font-medium tracking-tight text-foreground">
                  {a.label}
                </h3>
              </div>

              {/* Description */}
              <p className="mb-12 text-sm font-light leading-relaxed text-muted">
                {a.description}
              </p>

              {/* Tags - Convertidos en teclas de hardware */}
              <div className="mt-auto flex flex-wrap gap-2">
                {a.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border/50 bg-foreground/[0.015] px-2.5 py-1.5 text-[11px] font-medium tracking-wide text-muted/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] transition-colors duration-500 group-hover:border-border group-hover:text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
