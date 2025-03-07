import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link
              className="text-primary font-medium underline"
              href="/sign-in"
            >
              Sign in
            </Link>
          </CardDescription>
        </CardHeader>
        <form className="flex flex-col mx-auto">
          <CardContent>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="you@example.com" required />
              <Label className="mt-4" htmlFor="password">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="Your password"
                minLength={6}
                required
              />
              <FormMessage message={searchParams} />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton
              className="w-full"
              formAction={signUpAction}
              pendingText="Signing up..."
            >
              Sign up
            </SubmitButton>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
