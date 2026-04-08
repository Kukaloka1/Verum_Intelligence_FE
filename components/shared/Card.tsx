import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Card({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-3xl border border-border bg-panel p-5 shadow-soft", className)}>
      {children}
    </div>
  );
}
