import { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}
