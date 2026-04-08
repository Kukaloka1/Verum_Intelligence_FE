import { AppShell } from "@/components/layout/AppShell";

export default function QueryPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">AI Query Interface</h1>
        <p className="text-sm text-white/65">
          Natural-language legal and compliance questions with structured, citable answers.
        </p>
      </div>
    </AppShell>
  );
}
