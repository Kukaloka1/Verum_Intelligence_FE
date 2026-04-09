"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils/cn";

interface ThemeToggleProps {
  className?: string;
  variant?: "default" | "inverted";
}

export function ThemeToggle({ className, variant = "default" }: ThemeToggleProps) {
  const { ready, theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={ready ? `Switch to ${isDark ? "light" : "dark"} theme` : "Switch theme"}
      onClick={toggleTheme}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200",
        variant === "default"
          ? "border-border bg-panel text-foreground hover:bg-panel2"
          : "border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.1]",
        className
      )}
    >
      <span className="flex h-4 w-4 items-center justify-center">
        {isDark ? <Moon size={13} /> : <Sun size={13} />}
      </span>
    </button>
  );
}
