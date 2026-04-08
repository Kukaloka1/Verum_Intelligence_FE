import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./providers/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background:  "var(--background)",
        panel:       "var(--panel)",
        panel2:      "var(--panel-2)",
        foreground:  "var(--foreground)",
        muted:       "var(--muted)",
        accent:      "rgba(var(--accent-rgb), <alpha-value>)",
        accentHover: "var(--accent-hover)",
        surfaceDark: "rgba(var(--surface-dark-rgb), <alpha-value>)",
        border:      "var(--border)",
      },
      borderRadius: {
        xl2: "var(--radius)"
      },
      boxShadow: {
        soft: "var(--shadow)"
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "monospace"],
      }
    }
  },
  plugins: []
};

export default config;
