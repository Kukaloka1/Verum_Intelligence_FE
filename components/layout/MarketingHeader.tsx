"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { GoogleIcon } from "@/components/shared/GoogleIcon";

export function MarketingHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navItems = [
    { label: "Product", href: "/#what-we-do" },
    { label: "Who it's for", href: "/#audience" },
    { label: "Jurisdictions", href: "/#jurisdictions" },
    { label: "Why Verum", href: "/#why-verum" },
    { label: "The Firm", href: ROUTES.about },
  ];

  return (
    <>
      {/* Fixed height header — no layout-triggering property changes on scroll */}
      <header className="fixed top-0 left-0 right-0 z-[100] pt-4">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition-[border-color,background-color,box-shadow] duration-300 ${
              scrolled
                ? "border-white/[0.08] bg-surfaceDark shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                : "border-transparent bg-transparent"
            }`}
          >
            <Link href="/" className="group relative z-[110] flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-[13px] font-black text-white transition-transform duration-200 group-hover:scale-105">
                V
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-white">Verum Intelligence</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent leading-none opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Lavine & Co.
                </span>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 rounded-full border border-white/[0.05] bg-white/[0.02] p-1 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-1.5 text-[13px] font-medium text-white/50 transition-[background-color,color] duration-200 hover:bg-white/[0.05] hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <ThemeToggle variant="inverted" />

              <Link
                href={ROUTES.login}
                className="group relative overflow-hidden rounded-xl bg-accent px-5 py-2.5 text-[13px] font-semibold text-white transition-[background-color] duration-200 hover:bg-accentHover"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  <GoogleIcon className="h-4 w-4 rounded-full bg-white p-[1px]" />
                  Sign in
                </span>
                <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
              </Link>
              <a
                href="mailto:verumlavineandco@gmail.com"
                className="rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/75 transition-[background-color,color] duration-200 hover:bg-white/[0.08] hover:text-white"
              >
                Contact
              </a>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="relative z-[110] flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white transition-[background-color] duration-200 hover:bg-white/[0.08] md:hidden"
            >
              <div className="relative h-4 w-5">
                <span className={`absolute left-0 block h-0.5 w-5 bg-current transition-[top,transform] duration-200 ${isOpen ? "top-2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-2 block h-0.5 bg-current transition-[width,opacity] duration-200 ${isOpen ? "w-0 opacity-0" : "w-5 opacity-100"}`} />
                <span className={`absolute left-0 block h-0.5 w-5 bg-current transition-[top,transform] duration-200 ${isOpen ? "top-2 -rotate-45" : "top-4"}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[90] flex flex-col bg-surfaceDark transition-[transform,opacity] duration-300 md:hidden ${
          isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative flex h-full flex-col px-8 pb-12 pt-28">
          <div className="mb-8 text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Navigation</div>

          <nav className="flex flex-col gap-6">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center justify-between text-4xl font-light tracking-tighter text-white transition-[transform,opacity] duration-200 ${
                  isOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: isOpen ? `${i * 60}ms` : "0ms" }}
              >
                {item.label}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 transition-[transform,opacity] duration-200 group-hover:translate-x-1 group-hover:opacity-100 text-accent">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            ))}
          </nav>

          <div className="mt-auto space-y-8">
            <div className="h-px w-full bg-white/[0.05]" />
            <ThemeToggle variant="inverted" className="w-full justify-center py-3" />
            <div className="grid grid-cols-2 gap-4">
              <Link href={ROUTES.login} onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 rounded-2xl border border-white/[0.08] py-4 text-sm font-medium text-white/70">
                <GoogleIcon className="h-4 w-4 rounded-full bg-white p-[1px]" />
                Sign in
              </Link>
              <a
                href="mailto:verumlavineandco@gmail.com"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center rounded-2xl bg-accent py-4 text-sm font-bold text-white"
              >
                Contact
              </a>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Verum Lavine & Co.</div>
              <div className="text-[9px] text-white/10 uppercase tracking-widest">Jakarta • DIFC • ADGM • QFC • KSA</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
