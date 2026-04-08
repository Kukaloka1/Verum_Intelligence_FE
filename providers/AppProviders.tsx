import { ReactNode } from "react";
import { QueryClientProvider } from "./QueryClientProvider";
import { SessionProvider } from "./SessionProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
}
