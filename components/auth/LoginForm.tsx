import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";
import { GoogleSignInButton } from "./GoogleSignInButton";

export function LoginForm() {
  return (
    <div className="space-y-4">
      <GoogleSignInButton />
      <Input placeholder="Email" />
      <Input placeholder="Password" type="password" />
      <Button className="w-full">Sign in</Button>
    </div>
  );
}
