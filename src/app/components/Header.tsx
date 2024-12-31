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
  useUser,
} from "@clerk/nextjs";
import {
  LucideArrowRight,
  LucideCalendar1,
  LucideCalendarRange,
  LucideChevronsUpDown,
  LucideClock12,
  LucidePlusCircle,
  LucideSettings,
  LucideTriangleAlert,
} from "lucide-react";
import { useParams } from "next/navigation";
import { FC, use, useMemo, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const Header: FC = () => {
  const { user } = useUser();
  const params = useParams();

  const appId = params.appId;

  const apps = user?.publicMetadata.apps ?? [];

  const app = useMemo(() => {
    if (appId && user) {
      return apps.find((app) => app.id === appId);
    }
  }, [user, appId]);

  const [appModalActive, setAppModalActive] = useState(false);
  const [smallDeviceAppModalActive, setSmallDeviceAppModalActive] =
    useState(false);

  return (
    <div className="px-5 border-b-2 border-black flex flex-col sticky top-0 gap-3 z-50 bg-background dark:bg-background py-3">
      <div className="flex flex-row items-center justify-between">
        <div className="inline-flex items-center font-geist-mono">
          <Link
            href="/"
            className="flex flex-row items-center gap-2 hover:bg-secondary px-2 py-1 rounded-xl cursor-pointer duration-150"
          >
            <LucideCalendarRange />
            <h1 className="font-bold text-lg">Schedify</h1>
          </Link>

          {app ? (
            <>
              <svg
                width="8"
                height="16"
                viewBox="0 0 8 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="max-md:hidden mx-3"
              >
                <path
                  d="M7 1L1 15"
                  className="stroke-gray-600"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <Popover
                open={appModalActive}
                onOpenChange={(open) => setAppModalActive(open)}
              >
                <PopoverTrigger asChild>
                  <div
                    className={cn(
                      "max-md:hidden text-sm select-none tracking-wider inline-flex items-center gap-3 dark:hover:bg-neutral-900 dark:hover:border-neutral-500 dark:hover:shadow cursor-pointer min-w-16 justify-center p-1 rounded-md",
                      appModalActive && "dark:bg-neutral-900 shadow"
                    )}
                  >
                    {app.name} <LucideChevronsUpDown size={14} />
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="rounded-lg p-0 overflow-hidden bg-neutral-100"
                >
                  <div className="bg-white border-b border-neutral-200 dark:border-neutral-700">
                    <div className="p-1 pl-3 flex items-center gap-2">
                      <LucideClock12 size={14} />
                      <h1 className="font-bold text-sm">{app.name}</h1>
                      <button
                        title="Setting"
                        className="ml-auto hover:bg-secondary p-2 rounded-lg hover:shadow"
                      >
                        <LucideSettings size={14} />
                      </button>
                    </div>
                  </div>

                  {apps.filter((app) => app.id !== appId).length > 0 ? (
                    <div className="flex flex-col gap-1 bg-white rounded-b-lg border-b-2">
                      {apps
                        .filter((app) => app.id !== appId)
                        .map((app) => (
                          <a
                            key={app.id}
                            href={`/apps/${app.id}`}
                            className="p-2 pl-3 hover:bg-neutral-50 dark:hover:bg-neutral-900 inline-flex items-center justify-between dark:hover:text-neutral-500 group text-sm"
                          >
                            {app.name}

                            <LucideArrowRight
                              className="group-hover:block hidden"
                              size={14}
                            />
                          </a>
                        ))}
                    </div>
                  ) : null}

                  <Link
                    href="/apps/create"
                    className="cursor-pointer inline-flex items-center gap-2 p-2 px-3  w-full focus-within:outline-none group"
                  >
                    <LucidePlusCircle size={14} />
                    <span className="text-xs font-geist-sans group-hover:underline">
                      Create Application
                    </span>
                  </Link>
                </PopoverContent>
              </Popover>
            </>
          ) : null}
        </div>

        <div className="inline-flex items-center gap-5">
          <button className="font-normal text-sm font-geist-mono hover:text-blue-500 hover:underline underline-offset-4">
            API
          </button>

          <Link
            href="https://github.com/schedify"
            passHref
            target="_blank"
            className="font-normal text-sm font-geist-mono hover:text-blue-500 hover:underline underline-offset-4"
          >
            GitHub
          </Link>

          <ClerkLoading>
            <Skeleton className="min-h-[28px] min-w-[28px] rounded-full" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="rounded-full font-semibold">
                  Join Now!
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton userProfileMode="modal" />
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>

      <div className="md:hidden">
        {app ? (
          <>
            <Popover
              open={smallDeviceAppModalActive}
              onOpenChange={(open) => setSmallDeviceAppModalActive(open)}
            >
              <PopoverTrigger asChild>
                <div
                  className={cn(
                    "md:hidden text-sm tracking-wider inline-flex items-center gap-3 dark:hover:bg-neutral-900 dark:hover:border-neutral-500 dark:hover:shadow cursor-pointer min-w-16 justify-center p-1 rounded-md",
                    appModalActive && "dark:bg-neutral-900 shadow"
                  )}
                >
                  {app.name} <LucideChevronsUpDown size={14} />
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="rounded-lg p-0 overflow-hidden bg-neutral-100"
              >
                <div className="bg-white border-b border-neutral-200 dark:border-neutral-700">
                  <div className="p-1 pl-3 flex items-center gap-2">
                    <LucideClock12 size={14} />
                    <h1 className="font-bold text-sm">{app.name}</h1>
                    <button
                      title="Setting"
                      className="ml-auto hover:bg-secondary p-2 rounded-lg hover:shadow"
                    >
                      <LucideSettings size={14} />
                    </button>
                  </div>
                </div>

                {apps.filter((app) => app.id !== appId).length > 0 ? (
                  <div className="flex flex-col gap-1 bg-white rounded-b-lg border-b-2">
                    {apps
                      .filter((app) => app.id !== appId)
                      .map((app) => (
                        <a
                          key={app.id}
                          href={`/apps/${app.id}`}
                          className="p-2 pl-3 hover:bg-neutral-50 dark:hover:bg-neutral-900 inline-flex items-center justify-between dark:hover:text-neutral-500 group text-sm"
                        >
                          {app.name}

                          <LucideArrowRight
                            className="group-hover:block hidden"
                            size={14}
                          />
                        </a>
                      ))}
                  </div>
                ) : null}

                <Link
                  href="/apps/create"
                  className="cursor-pointer inline-flex items-center gap-2 p-2 px-3  w-full focus-within:outline-none group"
                >
                  <LucidePlusCircle size={14} />
                  <span className="text-xs font-geist-sans group-hover:underline">
                    Create Application
                  </span>
                </Link>
              </PopoverContent>
            </Popover>
          </>
        ) : null}
      </div>
    </div>
  );
};
