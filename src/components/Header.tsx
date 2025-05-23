"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { LucideSettings, LucideSettings2 } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="sticky top-0 left-0 right-0 z-50 bg-background ">
      <div className="flex flex-col mx-5 mt-5 gap-3 p-2 border">
        <div className="flex flex-row items-center justify-between">
          <div className="inline-flex items-center font-poppins gap-5">
            <Link
              href="/"
              className="flex flex-row items-center gap-2 hover:bg-secondary px-2 py-1 rounded-xl cursor-pointer duration-150"
            >
              <img src="/schedify.png" alt="Schedify" height={24} width={24} />
              <h1 className="font-bold text-[15px]">Schedify</h1>
            </Link>

            <Link
              href="https://insigh.to/b/schedify"
              passHref
              target="_blank"
              className="flex flex-row max-sm:hidden items-center gap-2 font-geist-sans hover:bg-secondary px-2 py-1 rounded-xl cursor-pointer duration-150"
            >
              <h1 className="text-sm">Feature Request</h1>
            </Link>

            <Link
              href="https://docs.schedify.dev/docs/introduction"
              passHref
              target="_blank"
              className="flex flex-row items-center gap-2 font-geist-sans hover:bg-secondary px-2 py-1 rounded-xl cursor-pointer duration-150"
            >
              <h1 className="text-sm">Docs</h1>
            </Link>
          </div>

          <div className="inline-flex items-center gap-5">
            <Link href="https://discord.gg/DYmy6QYUpr" className="fill-white">
              <Button variant="ghost" size="icon">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-3"
                >
                  <title>Discord</title>
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </Button>
            </Link>

            <div>
              <Link href="/schedules">
                <Button className="font-semibold">Schedule Now!</Button>
              </Link>

              {/* <ClerkLoading>
                <Skeleton className="min-h-[28px] min-w-[28px]" />
              </ClerkLoading>
              <ClerkLoaded>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button className="font-semibold">Join Now!</Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="inline-flex items-center gap-5">
                    <Link href="/settings">
                      <Button variant="ghost" size="icon">
                        <LucideSettings className="size-4" />
                      </Button>
                    </Link>
                    <UserButton userProfileMode="modal" />
                  </div>
                </SignedIn>
              </ClerkLoaded> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
