"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  ready: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = "verum-theme";
const SYSTEM_THEME_QUERY = "(prefers-color-scheme: dark)";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia(SYSTEM_THEME_QUERY).matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [ready, setReady] = useState(false);
  const [hasExplicitPreference, setHasExplicitPreference] = useState(false);

  useEffect(() => {
    const storedTheme = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    const resolvedTheme = isTheme(storedTheme) ? storedTheme : getSystemTheme();

    setThemeState(resolvedTheme);
    setHasExplicitPreference(isTheme(storedTheme));
    applyTheme(resolvedTheme);
    setReady(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY);
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (hasExplicitPreference) {
        return;
      }

      const nextTheme: Theme = event.matches ? "dark" : "light";
      setThemeState(nextTheme);
      applyTheme(nextTheme);
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [hasExplicitPreference]);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    setHasExplicitPreference(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    }
    applyTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      ready,
      setTheme,
      toggleTheme
    }),
    [ready, setTheme, theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider.");
  }

  return context;
}

