const STATS = [
  { value: "4", label: "GCC Jurisdictions" },
  { value: "5", label: "Product modules" },
  { value: "100%", label: "Source-backed" },
  { value: "1", label: "Unified workspace" },
];

const PILLARS = [
  {
    index: "01",
    title: "Source-backed, not hallucinated",
    description:
      "Verum Intelligence is built around traceable regulatory sources. Answers surface citations, jurisdiction references, and framework context — not generic summaries that erode trust.",
  },
  {
    index: "02",
    title: "Jurisdiction-aware by design",
    description:
      "The product is purpose-built for the GCC. Navigation, comparison, and monitoring surfaces are structured around real jurisdictional differences — not generic compliance UI templates.",
  },
  {
    index: "03",
    title: "A workspace, not a widget",
    description:
      "This is a premium product environment built for repeated professional use. Saved queries, authenticated sessions, and modular surfaces that compound over time — not one-off chat interactions.",
  },
];

export function LandingWhySection() {
  return (
    <section id="why-verum" className="relative mx-auto max-w-7xl px-6 py-32">
      
      {/* Background Decor - Un haz de luz sutil que cruza la sección */}
      <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      {/* Section header */}
      <div className="relative z-10 mb-20">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-[1px] w-8 bg-accent" />
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            The Verum Standard
          </div>
        </div>
        <h2 className="max-w-2xl text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-6xl">
          Built for clarity,<br /> 
          <span className="text-foreground italic">not AI theater.</span>
        </h2>
      </div>

      {/* Stats row - Transformado en un "Dashboard de Precisión" */}
      <div className="relative z-10 mb-24 grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-border bg-border shadow-2xl md:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="group relative flex flex-col justify-end bg-panel px-8 py-10 transition-colors duration-500 hover:bg-panel2/80"
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
            
            <div className="relative">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted/40 transition-colors group-hover:text-accent">
                Metric.log
              </div>
              <div className="tabular-nums text-5xl font-medium tracking-tighter text-foreground md:text-6xl">
                {s.value}
              </div>
              <div className="mt-2 text-[11px] font-medium uppercase tracking-widest text-muted/60">
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pillars - Layout de especificación técnica */}
      <div className="grid gap-16 md:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.index} className="group relative flex flex-col gap-6">
            
            {/* Header del Pilar */}
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-panel text-[11px] font-bold text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-500 group-hover:border-foreground group-hover:text-foreground">
                {p.index}
              </div>
              <div className="h-px w-full bg-gradient-to-r from-border to-transparent" />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-foreground">
                {p.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-foreground">
                {p.description}
              </p>
            </div>

            {/* Acento lateral sutil solo visible en hover para no saturar */}
            <div className="absolute -left-4 top-0 h-0 w-1 rounded-full bg-accent transition-all duration-500 group-hover:h-full group-hover:opacity-100 opacity-0" />
          </div>
        ))}
      </div>
    </section>
  );
}
