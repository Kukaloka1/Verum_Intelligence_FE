export function PageHeader({
  title,
  description
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-semibold">{title}</h1>
      {description ? <p className="mt-2 max-w-3xl text-sm text-white/65">{description}</p> : null}
    </div>
  );
}
