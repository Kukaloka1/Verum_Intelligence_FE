import { ReactNode } from "react";

export function MarketingSection({
  id,
  eyebrow,
  title,
  description,
  children
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-14">
      {eyebrow ? (
        <div className="mb-3 text-xs uppercase tracking-[0.2em] text-white/45">{eyebrow}</div>
      ) : null}
      <h2 className="text-3xl font-semibold text-white">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-3xl text-base text-white/65">{description}</p>
      ) : null}
      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}
