import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";
import { GoogleSignInButton } from "./GoogleSignInButton";

export function SignupForm() {
  return (
    <div className="space-y-4">
      <GoogleSignInButton />
      <Input placeholder="Email" />
      <Input placeholder="Password" type="password" />
      <Button className="w-full">Create account</Button>
    </div>
  );
}
