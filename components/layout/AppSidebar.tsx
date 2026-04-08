import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

const items = [
  ["AI Query Interface", ROUTES.query],
  ["Compliance Dashboard", ROUTES.dashboard],
  ["Framework Comparison", ROUTES.comparison],
  ["Market Entry Toolkit", ROUTES.toolkit],
  ["User Workspace", ROUTES.workspace]
] as const;

export function AppSidebar() {
  return (
    <aside className="w-[280px] border-r border-white/10 bg-white/5 p-6">
      <div className="mb-8 text-lg font-semibold">Verum Intelligence</div>
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item[1]}
            href={item[1]}
            className="block rounded-2xl px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white"
          >
            {item[0]}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
