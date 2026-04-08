import { ReactNode } from "react";
import { Card } from "@/components/shared/Card";

export function AuthCard({ children }: { children: ReactNode }) {
  return <Card className="mx-auto max-w-md">{children}</Card>;
}
