import { Button } from "@/components/ui/button";
import {
  LucideAlertTriangle,
  LucideChevronDown,
  LucideCircleAlert,
  LucideCircleSlash,
  LucideClock,
  LucideClockAlert,
  LucideDot,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
enum ActivityStatus {
  Completed = 1,
  Retried = 2,
  Failed = 3,
  Active = 4,
  Pending = 5,
}

type RetryLog = {
  retryId: string;
  timestamp: Date;
  triggeredBy: "manual" | "automatic";
  reason?: string;
};

type ActivityLog = {
  logId: string;
  timestamp: Date;
  message: string;
  metadata?: Record<string, any>;
};

type Activity = {
  id: string;
  status: ActivityStatus;
  createdAt: Date;
  updatedAt: Date;
  retries: RetryLog[];
  logs: ActivityLog[];
  triggeredBy: "system" | "user";
  taskId: string;
  taskDescription: string;
  metadata?: Record<string, any>;
};
const ACTIVITIES: Activity[] = [
  {
    id: "1",
    status: ActivityStatus.Completed,
    createdAt: new Date(),
    updatedAt: new Date(),
    retries: [],
    logs: [
      {
        logId: "log1",
        timestamp: new Date(),
        message: "Task completed successfully",
      },
    ],
    triggeredBy: "system",
    taskId: "task1",
    taskDescription: "Data backup",
  },
  {
    id: "2",
    status: ActivityStatus.Failed,
    createdAt: new Date(),
    updatedAt: new Date(),
    retries: [
      {
        retryId: "retry1",
        timestamp: new Date(),
        triggeredBy: "automatic",
        reason: "Network error",
      },
    ],
    logs: [
      {
        logId: "log2",
        timestamp: new Date(),
        message: "Task failed due to network error",
      },
    ],
    triggeredBy: "user",
    taskId: "task2",
    taskDescription: "File upload",
  },
  {
    id: "3",
    status: ActivityStatus.Active,
    createdAt: new Date(),
    updatedAt: new Date(),
    retries: [],
    logs: [
      {
        logId: "log3",
        timestamp: new Date(),
        message: "Task is currently running",
      },
    ],
    triggeredBy: "system",
    taskId: "task3",
    taskDescription: "Data processing",
  },
  {
    id: "4",
    status: ActivityStatus.Retried,
    createdAt: new Date(),
    updatedAt: new Date(),
    retries: [
      {
        retryId: "retry2",
        timestamp: new Date(),
        triggeredBy: "manual",
        reason: "User requested retry",
      },
    ],
    logs: [
      {
        logId: "log4",
        timestamp: new Date(),
        message: "Task retried by user",
      },
    ],
    triggeredBy: "user",
    taskId: "task4",
    taskDescription: "Email sending",
  },
];

import { fetchAppWebhooks } from "@/app/utils/get-apps";
import { FC } from "react";

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

          <h1 className="text-3xl mt-2">1</h1>
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
            Active Tasks
          </h1>

          <h1 className="text-3xl mt-2">1</h1>
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

          <h1 className="text-3xl mt-2">1</h1>
        </div>

        <div className="place-items-end">
          <h1 className="font-semibold inline-flex items-center gap-2">
            <LucideClockAlert size={18} />
            Errored Tasks
          </h1>

          <h1 className="text-3xl mt-2">1</h1>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="border rounded-lg p-5 relative">
          <h1 className="font-semibold text-lg">Recent activity</h1>

          <div className="mt-5">
            {ACTIVITIES.map((activity) => (
              <Link
                className="flex items-center gap-2 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 duration-100 p-3 rounded-lg"
                key={activity.id}
                href={`/apps/${id}/activities/${activity.id}`}
              >
                {activity.status === ActivityStatus.Completed ? (
                  <LucideCircleSlash size={18} />
                ) : activity.status === ActivityStatus.Failed ? (
                  <LucideCircleAlert size={18} />
                ) : activity.status === ActivityStatus.Retried ? (
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
                ) : activity.status === ActivityStatus.Active ? (
                  <LucideDot size={18} />
                ) : null}

                <div className="flex flex-col flex-1">
                  <h1 className="font-semibold text-sm">
                    Task {activityStatusLabel(activity.status)}
                  </h1>
                  <h1 className="text-sm text-gray-500">{activity.id}</h1>
                </div>

                <div>
                  <h1 className="text-xs text-gray-500">
                    {moment(activity.updatedAt).format(
                      "MMM Do YYYY, h:mm:ss a"
                    )}{" "}
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

function activityStatusLabel(status: ActivityStatus) {
  switch (status) {
    case ActivityStatus.Completed:
      return "Completed";
    case ActivityStatus.Retried:
      return "Retried";
    case ActivityStatus.Failed:
      return "Failed";
    case ActivityStatus.Active:
      return "Active";
    case ActivityStatus.Pending:
      return "Pending";
  }
}
