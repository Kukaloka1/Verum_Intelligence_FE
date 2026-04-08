import Image from "next/image";

export function LandingTransitionSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Background image — full bleed */}
      <Image
        src="/images/jakarta1.webp"
        alt="GCC regulatory landscape"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority={false}
      />

      {/* Gradient overlays — top fade from bg, heavy bottom darkening */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-transparent to-[#0A0806]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0806] via-[#0A0806]/60 to-transparent" />

      {/* Content — anchored to bottom */}
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-20 md:pb-28">

        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-10 bg-accent" />
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-accent">
            The Intelligence Gap
          </span>
        </div>

        {/* Headline */}
        <h2 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-background md:text-6xl">
          Regulatory frameworks
          <br />
          <span className="text-background/50">don't wait for you</span>
          <br />
          to catch up.
        </h2>

        {/* Divider + body copy side by side on desktop */}
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-lg text-sm font-light leading-relaxed text-background/60 md:text-base">
            In the GCC, enforcement posture shifts quarterly. Consultation windows open and close.
            Licensing thresholds move with policy cycles.
            The gap between informed and exposed is measured in weeks, not years.
          </p>

          <div className="flex items-center gap-4 md:shrink-0">
            <div className="h-px w-12 bg-background/20" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-background/30">
              DIFC · ADGM · QFC · KSA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
