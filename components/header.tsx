import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="w-full flex justify-center relative py-4 md:py-6">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" title="" className="flex outline-none">
              <img className="w-20" src="logo.png" alt="" />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button type="button" className="text-gray-900">
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex lg:ml-10 xl:ml-16 lg:items-center lg:justify-center lg:space-x-8">
            <Link
              href="#"
              className="px-4 py-2 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:text-opacity-50"
            >
              {" "}
              Dashboard{" "}
            </Link>

            <Link
              href="/community"
              className="px-4 py-2 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:text-opacity-50"
            >
              {" "}
              Community Reports{" "}
            </Link>

            {/* <Link href="#" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50"> Fees </Link> */}

            <Link
              href="/about"
              className="px-4 py-2 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:text-opacity-50"
            >
              {" "}
              About Us{" "}
            </Link>
          </div>

          <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-8 xl:space-x-10">
            {user ? (
              <div className="lg:ml-auto lg:flex lg:items-center lg:space-x-8 xl:space-x-10">
                <div>Hi, {user.email}!</div>
                <form action={signOutAction}>
                  <button
                    type="submit"
                    className="px-4 py-2 text-base font-medium leading-7 text-gray-900 transition-all duration-200 rounded-xl hover:text-opacity-50"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            ) : (
              <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-8 xl:space-x-10">
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:text-opacity-50 "
                >
                  {" "}
                  Sign in{" "}
                </Link>

                <Link
                  href="/sign-up"
                  className="px-4 py-1 text-base font-medium leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-opacity-90"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
