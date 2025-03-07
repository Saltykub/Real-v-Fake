import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Don't have an account?{" "}
          <Link
            className="text-foreground font-medium underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </CardDescription>
      </CardHeader>
      <form className="flex-1 flex flex-col">
        <CardContent>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
            <div className="mt-4 flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                className="text-xs text-foreground underline"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              required
            />

            <FormMessage message={searchParams} />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton
            className="w-full"
            pendingText="Signing In..."
            formAction={signInAction}
          >
            Sign in
          </SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
}
