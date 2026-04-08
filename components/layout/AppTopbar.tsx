"use client";

import { ROUTES } from "@/lib/constants/routes";
import { ShieldCheck, Activity, Cpu } from "lucide-react"; // Para reforzar el look técnico

export function AppTopbar() {
  return (
    <header className="relative flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md md:px-6 md:py-4">
      
      {/* Rim Light Superior - El detalle de hardware que lo cambia todo */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Mobile: Brand Mark (Solo visible en mobile como pediste) */}
      <div className="flex items-center gap-3 md:hidden">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-[13px] font-black text-white shadow-[0_0_15px_rgba(138,0,0,0.3)]">
          V
          <div className="absolute inset-0 rounded-xl border border-white/20" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight text-foreground leading-none">Verum</span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-accent">Intelligence</span>
        </div>
      </div>

      {/* Desktop: Contextual Subtitle - Elevado con indicadores de estado */}
      <div className="hidden items-center gap-6 md:flex">
        <div className="flex items-center gap-3 rounded-full border border-border/40 bg-white/[0.02] py-1.5 pl-2 pr-4">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent">
            <ShieldCheck size={12} strokeWidth={2.5} />
          </div>
          <span className="text-[13px] font-medium tracking-tight text-muted/80">
            Premium GCC regulatory intelligence workspace
          </span>
        </div>
        
        {/* Telemetría Sutil (Pura estética de Grado Dios) */}
        <div className="flex items-center gap-4 border-l border-border/50 pl-6">
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-accent/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/10">Sync.Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu size={12} className="text-accent/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/10">Neural.V4</span>
          </div>
        </div>
      </div>

      {/* Acciones de la derecha */}
      <div className="flex items-center gap-4">
        {/* Badge de Demo Build - Estilo Etiqueta de Seguridad */}
        <div className="relative group overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-white/[0.02] px-3 py-1.5 transition-colors group-hover:border-accent/40">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_8px_#8A0000]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
              Demo Build
            </span>
          </div>
        </div>

        {/* Separador final para terminar la simetría */}
        <div className="h-4 w-px bg-border/50" />
      </div>

      {/* Noise sutil interno */}
      <div 
        className="pointer-events-none absolute inset-0 z-[-1] opacity-[0.015] mix-blend-overlay" 
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} 
      />
    </header>
  );
}
