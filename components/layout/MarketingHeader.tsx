"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

export function MarketingHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Manejo de scroll para efectos de transparencia
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  const navItems = [
    { label: "Product", href: "#what-we-do" },
    { label: "Who it's for", href: "#audience" },
    { label: "Jurisdictions", href: "#jurisdictions" },
    { label: "Why Verum", href: "#why-verum" },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? "pt-2" : "pt-6"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div 
            className={`flex items-center justify-between rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              scrolled 
                ? "border-white/[0.08] bg-surfaceDark/80 backdrop-blur-xl px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                : "border-transparent bg-transparent px-2 py-2"
            }`}
          >
            {/* Logo Section */}
            <Link href="/" className="group relative z-[110] flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-[13px] font-black text-white shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)] transition-transform duration-500 group-hover:scale-110">
                V
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-white">
                  Verum Intelligence
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent leading-none opacity-0 transition-opacity group-hover:opacity-100">
                  Lavine & Co.
                </span>
              </div>
            </Link>

            {/* Desktop Nav - Pill Style */}
            <nav className="hidden items-center gap-1 rounded-full border border-white/[0.05] bg-white/[0.02] p-1 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-1.5 text-[13px] font-medium text-white/50 transition-all hover:bg-white/[0.05] hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href={ROUTES.login}
                className="text-[13px] font-medium text-white/40 transition-colors hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href={ROUTES.query}
                className="group relative overflow-hidden rounded-xl bg-accent px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-accentHover hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)]"
              >
                <span className="relative z-10">Open product</span>
                <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
              </Link>
            </div>

            {/* Burger Toggle - Clase Mundial */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[110] flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white transition-all hover:bg-white/[0.08] md:hidden"
            >
              <div className="relative h-4 w-5">
                <span 
                  className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                    isOpen ? "top-2 rotate-45" : "top-0"
                  }`} 
                />
                <span 
                  className={`absolute left-0 top-2 block h-0.5 bg-current transition-all duration-300 ${
                    isOpen ? "w-0 opacity-0" : "w-5 opacity-100"
                  }`} 
                />
                <span 
                  className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                    isOpen ? "top-2 -rotate-45" : "top-4"
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[100] flex flex-col bg-surfaceDark transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {/* Decoración de fondo del menú */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--accent) 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        
        <div className="relative flex h-full flex-col px-8 pb-12 pt-32">
          <div className="mb-8 text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
            Navigation
          </div>
          
          <nav className="flex flex-col gap-6">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center justify-between text-4xl font-light tracking-tighter text-white transition-all duration-500 ${
                  isOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {item.label}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100 text-accent"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            ))}
          </nav>

          <div className="mt-auto space-y-8">
            <div className="h-px w-full bg-white/[0.05]" />
            
            <div className="grid grid-cols-2 gap-4">
              <Link
                href={ROUTES.login}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center rounded-2xl border border-white/[0.08] py-4 text-sm font-medium text-white/60"
              >
                Sign in
              </Link>
              <Link
                href={ROUTES.query}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center rounded-2xl bg-accent py-4 text-sm font-bold text-white shadow-[0_10px_20px_rgba(var(--accent-rgb),0.3)]"
              >
                Open Product
              </Link>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                Verum Lavine & Co.
              </div>
              <div className="text-[9px] text-white/10 uppercase tracking-widest">
                Jakarta • DIFC • ADGM • QFC • KSA
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}