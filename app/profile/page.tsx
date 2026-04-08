import { AppShell } from "@/components/layout/AppShell";

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Profile</h1>
        <p className="text-sm text-white/65">
          Account and session context.
        </p>
      </div>
    </AppShell>
  );
}
