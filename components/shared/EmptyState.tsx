import { ReactNode } from "react";

export function EmptyState({ children }: { children?: ReactNode }) {
  return <div>{children}</div>;
}
