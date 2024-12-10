import { LucideArrowRight, LucidePlus } from "lucide-react";
import { App } from "./types";
import Link from "next/link";
import { formatTime } from "./utils/utils";
import { useUser } from "@clerk/nextjs";
import HomePageRoute from "./home/page";
import { currentUser } from "@clerk/nextjs/server";

const APPS: App[] = [
  {
    id: "1",
    name: "Task Manager",
    updatedAt: new Date("2024-12-01T10:00:00Z"),
    createdAt: new Date("2024-09-01T10:00:00Z"),
  },
  {
    id: "2",
    name: "Note Keeper",
    updatedAt: new Date("2024-11-02T11:00:00Z"),
    createdAt: new Date("2024-09-02T11:00:00Z"),
  },
  {
    id: "3",
    name: "Budget Tracker",
    updatedAt: new Date("2024-10-03T12:00:00Z"),
    createdAt: new Date("2024-09-03T12:00:00Z"),
  },
];

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return <HomePageRoute />;
  }

  // const { isLoaded, isSignedIn } = useUser();
  // if (!isLoaded || (isLoaded && !isSignedIn)) {
  //   return <HomePageRoute />;
  // }

  return (
    <div className="container space-y-10">
      <h3 className="mt-8 scroll-m-20 text-2xl font-[family-name:var(--font-geist-sans)] text-primary font-semibold tracking-tight">
        Applications
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 font-[family-name:var(--font-geist-mono)] ">
        <Link
          href="/apps/create"
          className="flex flex-col items-center justify-center border border-dashed rounded-lg min-h-[200px] bg-neutral-100 dark:bg-neutral-900 cursor-pointer border-neutral-300 dark:border-neutral-700 group hover:shadow-xl duration-100"
        >
          <LucidePlus
            className="group-hover:rotate-180 duration-150"
            size={16}
          />
          <span className="text-sm">Create application</span>
        </Link>

        {APPS.map((app) => (
          <Link
            href={`/apps/${app.id}`}
            key={app.id}
            className="flex flex-col border rounded-lg min-h-[200px] bg-neutral-100 dark:bg-neutral-900 cursor-pointer border-neutral-100 dark:border-neutral-700 group p-1 gap-1 hover:shadow-xl duration-100"
          >
            <div className="flex-1 bg-white dark:bg-neutral-950 flex flex-col rounded-md  shadow">
              <h1 className="text-sm font-bold mt-auto p-3 text-primary">
                {app.name}
              </h1>
            </div>

            <div className="px-2 py-1 text-[10px] flex flex-row items-center justify-between">
              <div className=" font-medium text-neutral-700 dark:text-neutral-400">
                Updated {formatTime(app.updatedAt)}
              </div>

              <div className="inline-flex items-center  gap-2">
                <span>Go to app</span> <LucideArrowRight size={10} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
