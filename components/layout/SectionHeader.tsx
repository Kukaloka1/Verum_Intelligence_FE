export function SectionHeader({
  title,
  description
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-medium">{title}</h2>
      {description ? <p className="mt-1 text-sm text-white/60">{description}</p> : null}
    </div>
  );
}
