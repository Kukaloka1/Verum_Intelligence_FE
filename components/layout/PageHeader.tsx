import { cn } from "@/lib/utils/cn";

export function PageHeader({
  title,
  description,
  className
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 md:mb-6", className)}>
      <h1 className="text-2xl font-semibold text-foreground md:text-3xl">{title}</h1>
      {description ? (
        <p className="mt-1.5 max-w-3xl text-sm text-muted md:mt-2">{description}</p>
      ) : null}
    </div>
  );
}
