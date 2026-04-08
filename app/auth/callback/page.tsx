"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPostAuthRedirect } from "@/lib/auth/redirect";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextParam = params.get("next") ?? params.get("redirect_to");
    const destination = getPostAuthRedirect(nextParam);
    router.replace(destination);
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] p-6 text-white">
      <div className="text-sm text-white/70">Completing authentication...</div>
    </main>
  );
}
