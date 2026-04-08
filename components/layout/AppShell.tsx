"use client";

import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppTopbar } from "./AppTopbar";
import { MobileBottomNav } from "./MobileBottomNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-background text-foreground">
      
      {/* Capa de Ambiente (Atmosphere Layer) 
          Añadimos profundidad sin tocar los colores base 
      */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute -right-[5%] bottom-[5%] h-[30%] w-[30%] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      {/* Main Layout Container */}
      <div className="relative z-10 flex h-full">
        
        {/* Sidebar: Se mantiene estático y sólido */}
        <AppSidebar />

        {/* Content Area: 
            Usamos overflow-hidden en el contenedor y overflow-y-auto en el main 
            para recrear el feeling de una App Nativa.
        */}
        <div className="flex min-w-0 flex-1 flex-col">
          
          {/* Topbar: Conectada al flujo pero con z-index superior */}
          <AppTopbar />

          <main className="relative flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
            {/* Content Wrapper: 
                Añadimos una transición sutil de entrada para los 'children'
            */}
            <div className="mx-auto min-h-full w-full max-w-[1600px] p-4 md:p-6 animate-in fade-in duration-700 ease-out">
              
              {/* Decoración Técnica de Esquina 
                  Refuerza el look de "Workspace" 
              */}
              <div className="pointer-events-none absolute left-6 top-6 h-12 w-12 border-l border-t border-white/[0.03]" />
              <div className="pointer-events-none absolute right-6 top-6 h-12 w-12 border-r border-t border-white/[0.03]" />

              {children}

              {/* Clearance for mobile bottom nav, courtesy spacing on desktop */}
              <div className="h-20 w-full md:h-20" />
            </div>

            {/* Noise Texture para consistencia con el Sidebar */}
            <div 
              className="pointer-events-none absolute inset-0 z-[-1] opacity-[0.012] mix-blend-overlay" 
              style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} 
            />
          </main>
        </div>
      </div>

      <MobileBottomNav />

      {/* Global CSS for the Scrollbar (Standard in high-end SaaS) */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(var(--accent-rgb), 0.2);
        }
      `}</style>
    </div>
  );
}
