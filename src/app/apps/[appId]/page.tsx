import { Button } from "@/components/ui/button";
import {
  LucideAlertTriangle,
  LucideCat,
  LucideChevronDown,
  LucideCircleAlert,
  LucideCircleSlash,
  LucideClock,
  LucideClockAlert,
  LucideDot,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";

import { fetchAppWebhooks } from "@/app/utils/get-apps";
import { FC } from "react";
import { fetchStats } from "@/app/utils/get-stats";
import { titleCase } from "@/app/utils/utils";

const AppWebhookAlert: FC<{ appId: string }> = async ({ appId }) => {
  const webhook = await fetchAppWebhooks(appId);
  if (webhook.length > 0) return null;

  return (
    <div className="flex flex-row w-full items-center border rounded-xl p-5 gap-5">
      <LucideAlertTriangle className="h-6 w-6" />
      <div className="p-0 my-auto">
        <h1 className="font-bold">No Webhook Found</h1>
        <p className="text-sm">To proceed, please create a webhook.</p>
      </div>

      <Link href={`${appId}/webhooks/create`} className="ml-auto">
        <Button size="sm">Create Webhook</Button>
      </Link>
    </div>
  );
};

export default async function App({
  params,
}: {
  params: Promise<{ appId: string }>;
}) {
  const id = (await params).appId;

  const stats = await fetchStats(id);

  return (
    <div className="container mt-10 space-y-10">
      <AppWebhookAlert appId={id} />

      <div className="grid grid-cols-4 border rounded-lg p-5 relative">
        <div className="absolute top-[-15px] right-5">
          <Button size="sm" variant="outline">
            All time <LucideChevronDown />
          </Button>
        </div>

        <div>
          <h1 className="font-semibold inline-flex items-center gap-2">
            <LucideClock size={18} />
            Total Tasks
          </h1>

          <h1 className="text-3xl mt-2">{stats.total}</h1>
        </div>

        <div>
          <h1 className="font-semibold inline-flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
              />
            </svg>
            Pending Tasks
          </h1>

          <h1 className="text-3xl mt-2">{stats.pending}</h1>
        </div>

        <div>
          <h1 className="font-semibold inline-flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                clipRule="evenodd"
              />
            </svg>
            Retry Tasks
          </h1>

          <h1 className="text-3xl mt-2">{stats.retry}</h1>
        </div>

        <div className="">
          <h1 className="font-semibold inline-flex items-center gap-2">
            <LucideClockAlert size={18} />
            Errored Tasks
          </h1>

          <h1 className="text-3xl mt-2">{stats.error}</h1>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="border rounded-lg p-5 relative">
          <h1 className="font-semibold text-lg">Recent events</h1>

          <div className="mt-5">
            {stats.events.length === 0 ? (
              <p className="text-sm flex-1 text-muted-foreground text-center inline-flex items-center mx-auto gap-3">
                Looks empty here <LucideCat size={18} />
              </p>
            ) : null}

            {stats.events.map((event) => (
              <Link
                className="flex items-center gap-2 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 duration-100 p-3 rounded-lg"
                key={event.id}
                href={`/apps/${id}/event/${event.id}`}
              >
                {event.status === "COMPLETED" ? (
                  <LucideCircleSlash size={18} />
                ) : event.status === "ERROR" ? (
                  <LucideCircleAlert
                    size={18}
                  /> /*: event.status === ActivityStatus.Retried ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )*/
                ) : event.status === "PENDING" ? (
                  <LucideDot size={18} />
                ) : null}

                <div className="flex flex-col flex-1">
                  <h1 className="font-semibold text-sm">
                    Task {titleCase(event.status)}
                  </h1>
                  <h1 className="text-sm text-gray-500">{event.id}</h1>
                </div>

                <div>
                  <h1 className="text-xs text-gray-500">
                    {moment(event.updatedAt).format("MMM Do YYYY, h:mm:ss a")}{" "}
                  </h1>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
