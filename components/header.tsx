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
            <Link href="#" title="" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
              <img className="w-auto h-8" src="https://d33wubrfki0l68.cloudfront.net/682a555ec15382f2c6e7457ca1ef48d8dbb179ac/f8cd3/images/logo.svg" alt="" />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button type="button" className="text-gray-900">
              <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex lg:ml-10 xl:ml-16 lg:items-center lg:justify-center lg:space-x-8 xl:space-x-16">
            <Link href="#" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50"> Solutions </Link>

            <Link href="#" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50"> Industries </Link>

            <Link href="#" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50"> Fees </Link>

            <Link href="#" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none hover:text-opacity-50"> About Rareblocks </Link>
          </div>

          <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-8 xl:space-x-10">
              <Link href="/sign-in" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50 "> Sign in </Link>

              <Link href="/sign-up" className="px-5 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-800">
                  Sign up
              </Link>
              {/* <HeaderAuth /> */}
          </div>
        </div>
      </div>
    </header>
  )
}