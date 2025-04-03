import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { DotIcon } from "lucide-react";
import Link from "next/link";

export default async function Header() {
  return (
    <div className="container flex flex-col sticky top-0 rounded-b-3xl gap-3 z-50 backdrop-blur-lg py-5">
      <div className="flex flex-row items-center justify-between">
        <div className="inline-flex items-center font-inconsolata">
          <Link
            href="/"
            className="flex flex-row items-center gap-2 hover:bg-secondary px-2 py-1 rounded-xl cursor-pointer duration-150"
          >
            <img src="/schedify.png" alt="Schedify" height={24} width={24} />
            <h1 className="font-bold text-lg">Schedify</h1>
          </Link>
        </div>

        <div className="inline-flex items-center gap-5">
          {/* <Link
            href="https://docs.schedify.dev/docs/introduction"
            passHref
            target="_blank"
            className=" text-sm font-inconsolata hover:text-blue-500 hover:underline underline-offset-4"
          >
            API
          </Link>

          <Link
            href="https://github.com/schedify"
            passHref
            target="_blank"
            className=" text-sm font-inconsolata hover:text-blue-500 hover:underline underline-offset-4"
          >
            GitHub
          </Link> */}

          <ClerkLoading>
            <Skeleton className="min-h-[28px] min-w-[28px] rounded-full" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton mode="modal">
                <Button className="rounded-full font-semibold">
                  Join Now!
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/settings">
                <Button variant="link">Settings</Button>
              </Link>

              <UserButton userProfileMode="modal" />
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
