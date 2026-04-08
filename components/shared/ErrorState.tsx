import { ReactNode } from "react";

export function ErrorState({ children }: { children?: ReactNode }) {
  return <div>{children}</div>;
}
