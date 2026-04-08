import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

const MODULES = [
  {
    id: "query",
    label: "AI Query Interface",
    description:
      "Ask compliance and regulatory questions in plain English. Receive structured, citation-backed answers grounded in real regulatory sources — not hallucinated summaries.",
    href: ROUTES.query,
    size: "large",
    tag: "Core surface",
  },
  {
    id: "dashboard",
    label: "Compliance Dashboard",
    description:
      "Monitor jurisdiction-level updates, alerts, and tracking signals across core GCC markets.",
    href: ROUTES.dashboard,
    size: "small",
    tag: "Monitoring",
  },
  {
    id: "comparison",
    label: "Framework Comparison",
    description:
      "Compare licensing requirements, frameworks, and regulatory standards side by side across DIFC, ADGM, QFC, and KSA.",
    href: ROUTES.comparison,
    size: "small",
    tag: "Research",
  },
  {
    id: "toolkit",
    label: "Market Entry Toolkit",
    description:
      "Roadmap-style guidance with indicative timing, cost bands, and structured caveats by jurisdiction.",
    href: ROUTES.toolkit,
    size: "small",
    tag: "Planning",
  },
  {
    id: "workspace",
    label: "User Workspace",
    description:
      "Save queries, return to work, and operate inside a real SaaS-style product environment.",
    href: ROUTES.workspace,
    size: "small",
    tag: "Continuity",
  },
];

export function LandingModulesSection() {
  const hero = MODULES.find((m) => m.size === "large")!;
  const secondary = MODULES.filter((m) => m.size === "small");

  return (
    <section id="what-we-do" className="relative mx-auto max-w-7xl px-6 py-32">
      
      {/* Header con spacing agresivo y tipografía refinada */}
      <div className="mb-20">
        <div className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
          Platform Architecture
        </div>
        <h2 className="max-w-3xl text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-5xl">
          Five product surfaces.
          <br />
          <span className="text-muted/40">One premium intelligence workspace.</span>
        </h2>
      </div>

      {/* Bento grid con gaps técnicos de 1px (estilo bento moderno) */}
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[2.5rem] border border-border bg-border shadow-2xl">

        {/* Hero module — El ancla visual */}
        <Link
          href={hero.href}
          className="group relative col-span-1 flex flex-col justify-between bg-panel p-10 transition-all duration-700 ease-in-out hover:bg-panel2 lg:col-span-2 lg:row-span-2"
        >
          {/* Efecto de luz ambiental en la esquina */}
          <div className="absolute -right-20 -top-20 h-[300px] w-[300px] bg-accent/10 blur-[100px] transition-opacity duration-1000 group-hover:opacity-100 opacity-50" />
          
          <div className="relative z-10">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent"></span>
              </span>
              {hero.tag}
            </div>
            
            <h3 className="mb-4 text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
              {hero.label}
            </h3>
            <p className="max-w-md text-base leading-relaxed text-muted/80">
              {hero.description}
            </p>
          </div>

          <div className="relative z-10 mt-16 flex items-center gap-3 text-sm font-medium text-foreground/40 transition-colors group-hover:text-accent">
            <div className="h-px w-8 bg-border transition-all group-hover:w-12 group-hover:bg-accent" />
            <span>Explore core module</span>
          </div>
        </Link>

        {/* Secondary modules — Grid interno dinámico */}
        {secondary.map((m) => (
          <Link
            key={m.id}
            href={m.href}
            className="group relative flex flex-col justify-between bg-panel p-8 transition-all duration-500 hover:bg-panel2"
          >
            {/* Overlay sutil de hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative z-10 flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted/40 transition-colors group-hover:text-muted/60">
                {m.tag}
              </span>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {m.label}
              </h3>
              <p className="text-sm leading-relaxed text-muted/60 transition-colors group-hover:text-muted/80">
                {m.description}
              </p>
            </div>

            <div className="relative z-10 mt-8 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted/30 transition-colors group-hover:text-foreground">
              <span>Initialize</span>
              <span className="translate-x-[-10px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}