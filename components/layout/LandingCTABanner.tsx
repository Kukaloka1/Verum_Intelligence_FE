import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

export function LandingCTABanner() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32">
      {/* Contenedor Principal con efecto de profundidad negativa */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-surfaceDark px-10 py-20 md:px-20">
        
        {/* Glow de marca ultra-difuso (Atmospheric) */}
        <div
          className="pointer-events-none absolute -bottom-48 -left-24 h-[500px] w-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(var(--accent-rgb), 0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        
        {/* Línea de luz superior (The Rim Light) */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        {/* Content Layout */}
        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Eyebrow con tracking extremo */}
          <div className="mb-6 text-[10px] font-bold uppercase tracking-[0.4em] text-background">
            Ready to navigate the GCC?
          </div>

          {/* Headline - Compacto y autoritario */}
          <h2 className="mb-6 max-w-2xl text-4xl font-medium leading-[1.1] tracking-tight text-background md:text-5xl">
            Explore the product direction now.
          </h2>

          {/* Subtext - Equilibrado para lectura rápida */}
          <p className="mb-12 max-w-xl text-base font-light leading-relaxed text-background">
            Move through the core product surfaces — AI Query, Compliance
            Dashboard, Framework Comparison, and Market Entry Toolkit.
          </p>

          {/* Único Botón: Sign In (The "Closing" Action) */}
          <div className="flex flex-col items-center gap-6">
            <Link
              href={ROUTES.login}
              className="group relative flex items-center justify-center overflow-hidden rounded-full bg-accent px-10 py-4 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(var(--accent-rgb),1),0_10px_30px_-10px_rgba(var(--accent-rgb),0.5),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-500 hover:scale-[1.02] hover:bg-accentHover active:scale-[0.98]"
            >
              {/* Brillo dinámico interno en el botón */}
              <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
              
              <span className="relative z-10 flex items-center gap-3">
                Sign In to Verum
                <span className="text-lg transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
            </Link>

            {/* Micro-label de seguridad/estatus */}
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-background">
              <span className="h-1 w-1 rounded-full bg-emerald-500/50" />
              Enterprise-grade secure access
            </div>
          </div>
        </div>

        {/* Decoración de fondo: Grid técnico tenue */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.02] mix-blend-overlay"
          style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px' 
          }}
        />
      </div>
    </section>
  );
}
