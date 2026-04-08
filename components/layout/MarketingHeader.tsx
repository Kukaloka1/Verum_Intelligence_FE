import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(11,16,32,0.85)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-lg font-semibold text-white">Verum Intelligence</div>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <a href="#who-we-are" className="hover:text-white">Who we are</a>
          <a href="#what-we-do" className="hover:text-white">What we do</a>
          <a href="#why-verum" className="hover:text-white">Why Verum</a>
          <a href="#jurisdictions" className="hover:text-white">Jurisdictions</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.login}
            className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Sign in
          </Link>
          <Link
            href={ROUTES.query}
            className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-950"
          >
            Open product
          </Link>
        </div>
      </div>
    </header>
  );
}
