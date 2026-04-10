const JURISDICTIONS = [
  { jurisdiction: "DIFC", status: "active" },
  { jurisdiction: "ADGM", status: "high attention" },
  { jurisdiction: "QFC", status: "active" },
  { jurisdiction: "KSA", status: "stable" },
] as const;

export function JurisdictionStrip() {
  return (
    <div className="w-full rounded-xl border border-border/30 bg-panel/10">
      <div className="mb-2 flex items-center gap-3 px-6 pt-4">
        <div className="h-1.5 w-1.5 bg-accent/60" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted/50">
          Regional Telemetry
        </span>
      </div>

      <div className="flex w-full min-w-max divide-x divide-border/20 overflow-x-auto md:min-w-0 md:grid md:grid-cols-4 md:overflow-visible">
        {JURISDICTIONS.map(({ jurisdiction, status }) => {
          const isHighAttention = status === "high attention";
          const isStable = status === "stable";

          return (
            <div
              key={jurisdiction}
              className="group relative flex min-w-[180px] flex-1 flex-col gap-1.5 px-6 py-5 transition-colors hover:bg-panel/10 md:min-w-0"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted/50">
                  {jurisdiction}
                </span>

                <div
                  className={[
                    "h-1.5 w-1.5 rounded-full",
                    isHighAttention
                      ? "bg-accent"
                      : isStable
                        ? "bg-muted/30"
                        : "bg-emerald-500/60"
                  ].join(" ")}
                />
              </div>

              <div
                className={[
                  "text-[13px] font-bold uppercase tracking-wider",
                  isHighAttention
                    ? "text-accent"
                    : isStable
                      ? "text-muted"
                      : "text-foreground/80"
                ].join(" ")}
              >
                {status}
              </div>

              <div className="mt-1 flex gap-0.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className={[
                      "h-1 w-2 rounded-[1px]",
                      isHighAttention
                        ? i > 2
                          ? "bg-accent/40"
                          : "bg-border/20"
                        : isStable
                          ? i > 4
                            ? "bg-border/20"
                            : "bg-muted/20"
                          : i > 3
                            ? "bg-foreground/20"
                            : "bg-muted/20"
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}