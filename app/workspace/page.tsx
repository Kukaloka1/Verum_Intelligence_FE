import { AppShell } from "@/components/layout/AppShell";

export default function WorkspacePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">User Workspace</h1>
        <p className="text-sm text-white/65">
          Saved queries, continuity, and personal product usage.
        </p>
      </div>
    </AppShell>
  );
}
