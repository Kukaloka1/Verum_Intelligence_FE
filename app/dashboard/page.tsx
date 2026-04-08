import { AppShell } from "@/components/layout/AppShell";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Compliance Dashboard</h1>
        <p className="text-sm text-white/65">
          Source-backed regulatory monitoring across DIFC, ADGM, QFC, and KSA.
        </p>
      </div>
    </AppShell>
  );
}
