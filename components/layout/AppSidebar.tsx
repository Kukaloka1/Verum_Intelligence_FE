"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { 
  MessageSquare, 
  LayoutDashboard, 
  Columns, 
  Briefcase, 
  UserCircle2,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const items = [
  ["AI Query Interface", ROUTES.query, MessageSquare],
  ["Compliance Dashboard", ROUTES.dashboard, LayoutDashboard],
  ["Framework Comparison", ROUTES.comparison, Columns],
  ["Market Entry Toolkit", ROUTES.toolkit, Briefcase],
  ["User Workspace", ROUTES.workspace, UserCircle2]
] as const;

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative hidden h-screen w-[280px] flex-col border-r border-border bg-panel px-4 py-8 md:flex">
      
      {/* Brand Surface - Refinada */}
      <div className="mb-12 px-2">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-accent text-sm font-black text-white shadow-[0_0_20px_rgba(138,0,0,0.3)] transition-transform duration-500 group-hover:scale-105">
            V
            {/* Efecto de barrido de luz en el logo */}
            <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground">
              Verum Intelligence
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/60">
              Lavine & Co.
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Header */}
      <div className="mb-4 px-4">
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted/30">
          Intelligence Modules
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-1.5">
        {items.map(([label, href, Icon]) => {
          const isActive = pathname === href;
          
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group relative flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300",
                isActive 
                  ? "bg-panel2 text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]" 
                  : "text-muted hover:bg-panel2/50 hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon 
                  size={18} 
                  strokeWidth={isActive ? 2 : 1.5}
                  className={cn(
                    "transition-colors duration-300",
                    isActive ? "text-accent" : "text-muted/60 group-hover:text-foreground"
                  )} 
                />
                <span className={cn(
                  "text-sm font-medium tracking-tight",
                  isActive ? "text-foreground" : "text-muted"
                )}>
                  {label}
                </span>
              </div>

              {/* Indicador de estado activo/hover */}
              {isActive ? (
                <div className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_#8A0000]" />
              ) : (
                <ChevronRight 
                  size={14} 
                  className="translate-x-[-4px] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" 
                />
              )}

              {/* Borde izquierdo dinámico */}
              <div className={cn(
                "absolute left-0 h-4 w-1 rounded-r-full bg-accent transition-all duration-500",
                isActive ? "opacity-100" : "opacity-0 group-hover:h-2 group-hover:opacity-30"
              )} />
            </Link>
          );
        })}
      </nav>

      {/* System Status Footer */}
      <div className="mt-auto border-t border-border/50 pt-6 px-2">
        <div className="rounded-2xl border border-white/[0.03] bg-white/[0.01] p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted/40 text-white/40">System Live</span>
            </div>
            <span className="text-[9px] font-mono text-muted/20 text-white/20">v2.4.0</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full border border-border bg-panel2 flex items-center justify-center text-[10px] font-bold text-muted">
              JD
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground">John Doe</span>
              <span className="text-[10px] text-muted/50">Premium Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Noise Texture Sutil */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015] mix-blend-overlay" 
           style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
    </aside>
  );
}
