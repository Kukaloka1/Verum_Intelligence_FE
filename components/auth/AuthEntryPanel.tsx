"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/shared/Input";
import { getPostAuthRedirect } from "@/lib/auth/redirect";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";

type AuthMode = "login" | "signup";

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
}

interface AuthEntryPanelProps {
  initialMode?: AuthMode;
  onGoogleSignIn?: () => void | Promise<void>;
  onLoginSubmit?: (payload: LoginPayload) => void | Promise<void>;
  onSignupSubmit?: (payload: SignupPayload) => void | Promise<void>;
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.4c-.2 1.3-1.6 3.9-5.4 3.9-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3.1.8 3.8 1.5L18.4 5C16.8 3.5 14.7 2.5 12 2.5A9.5 9.5 0 0 0 2.5 12 9.5 9.5 0 0 0 12 21.5c5.5 0 9.1-3.9 9.1-9.3 0-.6-.1-1.1-.2-1.6H12z"
      />
    </svg>
  );
}

async function runMaybeAsync(callback?: () => void | Promise<void>) {
  if (!callback) {
    return;
  }
  await callback();
}

export function AuthEntryPanel({
  initialMode = "login",
  onGoogleSignIn,
  onLoginSubmit,
  onSignupSubmit
}: AuthEntryPanelProps) {
  const router = useRouter();
  const [requestedRedirect, setRequestedRedirect] = useState<string | null>(null);

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [pendingAction, setPendingAction] = useState<"google" | "credentials" | null>(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupFullName, setSignupFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRequestedRedirect(params.get("next") ?? params.get("redirect_to"));
  }, []);

  const isLogin = mode === "login";
  const postAuthDestination = getPostAuthRedirect(requestedRedirect);

  const handleGoogleSignIn = async () => {
    setPendingAction("google");
    try {
      if (onGoogleSignIn) {
        await runMaybeAsync(onGoogleSignIn);
      } else {
        router.replace(postAuthDestination);
      }
    } finally {
      setPendingAction(null);
    }
  };

  const handleCredentialSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPendingAction("credentials");
    try {
      if (isLogin) {
        const payload = {
          email: loginEmail.trim(),
          password: loginPassword
        };

        if (onLoginSubmit) {
          await onLoginSubmit(payload);
        } else {
          router.replace(postAuthDestination);
        }

        return;
      }

      const payload = {
        fullName: signupFullName.trim(),
        email: signupEmail.trim(),
        password: signupPassword
      };

      if (onSignupSubmit) {
        await onSignupSubmit(payload);
      } else {
        router.replace(postAuthDestination);
      }
    } finally {
      setPendingAction(null);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surfaceDark px-6 py-14 text-background">
      
      {/* Decoración Atmosférica: Grid Técnico + Glow */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '48px 48px' 
        }}
      />
      <div className="pointer-events-none absolute -top-28 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      
      {/* Línea de horizonte técnica */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <section className="relative w-full max-w-[480px] overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-white/[0.02] p-8 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] backdrop-blur-3xl sm:p-12">
        
        {/* Borde de luz superior (Rim Light) */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mb-12 flex items-center justify-between">
          <Link
            href={ROUTES.home}
            className="group flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-[13px] font-black text-white shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]">
              V
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold tracking-tight text-background">Verum Intelligence</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent">Lavine & Co.</span>
            </div>
          </Link>
          <div className="rounded-full border border-white/5 bg-white/[0.03] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
            Secure Entry
          </div>
        </div>

        <header className="mb-10 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent/80">
            Authentication
          </p>
          <h1 className="text-3xl font-medium tracking-tighter text-background sm:text-4xl">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-[13px] font-light leading-relaxed text-white/40">
            Access the premier GCC regulatory workspace.
          </p>
        </header>

        {/* Google Action */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={pendingAction !== null}
          className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-medium text-background transition-all hover:bg-white/[0.06] hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <GoogleMark />
          <span className="relative z-10">
            {pendingAction === "google" ? "Connecting..." : "Continue with Google"}
          </span>
        </button>

        {/* Separator */}
        <div className="my-10 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/15">
          <span className="h-px flex-1 bg-white/5" />
          Protocol.email
          <span className="h-px flex-1 bg-white/5" />
        </div>

        {/* Mode Toggle - Estilo Maquinaria */}
        <div className="mb-8 grid grid-cols-2 rounded-2xl border border-white/5 bg-black/20 p-1.5 shadow-inner">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={cn(
              "rounded-xl py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300",
              isLogin 
                ? "bg-accent text-white shadow-lg" 
                : "text-white/30 hover:text-white/60"
            )}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={cn(
              "rounded-xl py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300",
              !isLogin 
                ? "bg-accent text-white shadow-lg" 
                : "text-white/30 hover:text-white/60"
            )}
          >
            Sign up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleCredentialSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1.5">
              <Input
                value={signupFullName}
                onChange={(event) => setSignupFullName(event.target.value)}
                placeholder="Full name"
                required
                className="h-12 border-white/5 bg-white/[0.02] px-4 text-sm placeholder:text-white/20 focus:border-accent/50 focus:bg-white/[0.04]"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Input
              value={isLogin ? loginEmail : signupEmail}
              onChange={(event) =>
                isLogin ? setLoginEmail(event.target.value) : setSignupEmail(event.target.value)
              }
              placeholder="Work email"
              type="email"
              required
              className="h-12 border-white/5 bg-white/[0.02] px-4 text-sm placeholder:text-white/20 focus:border-accent/50 focus:bg-white/[0.04]"
            />
          </div>

          <div className="space-y-1.5">
            <Input
              value={isLogin ? loginPassword : signupPassword}
              onChange={(event) =>
                isLogin ? setLoginPassword(event.target.value) : setSignupPassword(event.target.value)
              }
              placeholder="Password"
              type="password"
              required
              className="h-12 border-white/5 bg-white/[0.02] px-4 text-sm placeholder:text-white/20 focus:border-accent/50 focus:bg-white/[0.04]"
            />
          </div>

          <button
            type="submit"
            disabled={pendingAction !== null}
            className="group relative mt-6 flex w-full items-center justify-center overflow-hidden rounded-2xl bg-accent py-4 text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgba(var(--accent-rgb),0.5)] transition-all hover:bg-accentHover hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
            <span className="relative z-10 flex items-center gap-2">
              {pendingAction === "credentials"
                ? "Initialising..."
                : isLogin
                  ? "Authorize Access"
                  : "Create Workspace"}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </form>

        <footer className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setMode(isLogin ? "signup" : "login")}
            className="text-[11px] font-bold uppercase tracking-widest text-white/30 transition-colors hover:text-accent"
          >
            {isLogin ? "Request new access" : "I have an account"} — <span className="text-white/60">Switch mode</span>
          </button>
        </footer>
      </section>

      {/* Footer Legal sutil */}
      <div className="absolute bottom-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/10">
        Verum Lavine & Co. • Secure Protocol v2.0
      </div>
    </main>
  );
}

// Icono auxiliar para el botón
function ArrowRight({ size, className }: { size: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14m-7-7 7 7-7 7" />
    </svg>
  );
}
