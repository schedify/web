import { PageProps } from "@/app/types";
import {
  fetchAppWebhook,
  fetchWebhookEventPayload,
  fetchWebhookLogs,
} from "@/app/utils/get-webhooks";
import { redirect } from "next/navigation";
import { formatDate, formatTime } from "@/app/utils/utils";
import { Button } from "@/components/ui/button";
import {
  LucideCat,
  LucideCheck,
  LucideCheckCircle,
  LucideChevronLeft,
  LucideCircleAlert,
  LucideCircleSlash,
  LucideDot,
  LucideLoader2,
  LucideRotateCw,
  LucideToggleLeft,
  LucideToggleRight,
} from "lucide-react";
import { CopyTextComponent } from "@/app/components/CopyText";
import { FC, Suspense } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { db } from "@/db/drizzle";
import { webhookEventTable } from "@/db/schema";
import { cuid } from "@/lib/crypto";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { Skeleton } from "@/components/ui/skeleton";

export default async function WebhookRoute({
  params,
  searchParams,
}: PageProps) {
  const p = await params;
  const s = await searchParams;

  const logStatus =
    (Array.isArray(s.status) ? s.status.at(0) : s.status) || "all";

  const eventId =
    (Array.isArray(s.eventId) ? s.eventId.at(0) : s.eventId) ?? "";

  const appId = p.appId;

  return (
    <div className="container mt-10 space-y-10">
      <Link href={`/apps/${p.appId}/webhooks`}>
        <Button variant="link" size="sm">
          <LucideChevronLeft /> Back
        </Button>
      </Link>

      <div className="p-5 border rounded-xl grid grid-rows-4 gap-2 text-sm w-full">
        <Suspense
          fallback={
            <>
              <Skeleton className="min-h-[30px]" />
              <Skeleton className="min-h-[30px]" />
              <Skeleton className="min-h-[30px]" />
              <Skeleton className="min-h-[30px]" />
              <Skeleton className="min-h-[30px]" />
            </>
          }
        >
          <WebhookMeta appId={p.appId} webhookId={p.webhookId} />
        </Suspense>
      </div>

      <Suspense
        fallback={
          <>
            <div className="grid grid-cols-2 p-5 border rounded-xl gap-3 text-sm w-full divide-x">
              <Skeleton className="min-h-[100px]" />
              <Skeleton className="min-h-[100px]" />
            </div>
          </>
        }
      >
        <WebhookLogs
          logStatus={logStatus}
          webhookId={p.webhookId}
          eventId={eventId}
          appId={appId}
        />
      </Suspense>
    </div>
  );
}

const WebhookMeta: FC<{
  appId: string;
  webhookId: string;
}> = async ({ appId, webhookId }) => {
  const webhook = await fetchAppWebhook(appId, webhookId);
  if (!webhook) {
    redirect(`/apps/${appId}/webhooks`);
  }

  return (
    <>
      <div className="space-x-2 flex flex-row items-center">
        <span className="text-gray-600 font-poppins">Webhook</span>

        <CopyTextComponent
          text={webhook.id}
          className="font-semibold hover:bg-secondary duration-150 px-2 py-0.5 rounded-lg cursor-pointer font-geist-mono"
        />
      </div>

      <div className="space-x-2 flex flex-row items-center">
        <span className="text-gray-600 font-poppins">Status</span>
        <Status enabled={!!webhook.enabled} className="mx-0 font-karla" />

        <div className="flex-1"></div>

        <Button
          variant="link"
          size="sm"
          className="[&_svg]:size-3 h-0 text-red-500"
        >
          {webhook.enabled ? <LucideToggleLeft /> : <LucideToggleRight />}
          {webhook.enabled ? "Disable" : "Enable"}
        </Button>
      </div>

      <div className="space-x-2 flex flex-row items-center w-full">
        <div className="text-gray-600 text-sm font-poppins">Signing Secret</div>

        <CopyTextComponent
          hidden
          text={webhook.secret ?? ""}
          className="font-karla hover:bg-secondary duration-150 px-2 py-0.5 rounded-lg cursor-pointer"
        />

        <div className="flex-1"></div>

        <Button
          variant="link"
          size="sm"
          className="[&_svg]:size-3 text-red-500"
        >
          <LucideRotateCw /> Rotate
        </Button>
      </div>

      <div className="space-x-2 flex flex-row items-center">
        <span className="text-gray-600 text-sm font-poppins">Created at </span>
        <div className="font-karla">{formatDate(webhook.createdAt)}</div>
      </div>

      <div className="space-x-2 flex flex-row items-center">
        <span className="text-gray-600 text-sm font-poppins">Updated at</span>
        <div className="font-karla">{formatDate(webhook.updatedAt)}</div>
      </div>
    </>
  );
};

const WebhookLogs: FC<{
  logStatus: string;
  webhookId: string;
  eventId: string;
  appId: string;
}> = async ({ logStatus, webhookId, eventId, appId }) => {
  const logs = await fetchWebhookLogs(webhookId, logStatus);

  const groupedLogs = logs.reduce<{ [key: string]: typeof logs }>(
    (groups, log) => {
      if (log.updatedAt) {
        const date = new Date(log.updatedAt).toISOString().split("T")[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(log);
        return groups;
      }
      return {};
    },
    {}
  );

  return (
    <div className="grid grid-cols-2 p-5 border rounded-xl gap-3 text-sm w-full divide-x">
      <div className="">
        <ul className="flex flex-row items-center gap-3 pb-3">
          <li
            className={cn(
              "pb-1 font-[500] font-poppins relative",
              logStatus === "all" ? "border-black text-black" : "text-gray-500"
            )}
          >
            <Link href="?">All</Link>

            {logStatus === "all" ? (
              <div className="h-[2px] bg-black absolute bottom-0 w-full animate-in fade-in duration-500"></div>
            ) : null}
          </li>
          <li
            className={cn(
              "pb-1 font-[500] font-poppins relative",
              logStatus === "success" ? "text-black" : "text-gray-500"
            )}
          >
            <Link href="?status=success">Succeeded</Link>

            {logStatus === "success" ? (
              <div className="h-[2px] bg-black absolute bottom-0 w-full animate-in fade-in duration-500"></div>
            ) : null}
          </li>
          <li
            className={cn(
              "pb-1 font-[500] font-poppins relative ",
              logStatus === "error" ? "text-black" : "text-gray-500"
            )}
          >
            <Link href="?status=error">Error</Link>

            {logStatus === "error" ? (
              <div className="h-[2px] bg-black absolute bottom-0 w-full animate-in fade-in duration-500"></div>
            ) : null}
          </li>

          <li className="ml-auto">
            <form
              action={async () => {
                "use server";

                await db.insert(webhookEventTable).values({
                  id: `ev_${cuid()}`,
                  event: "schedify:test",
                  status: "COMPLETED",
                  webhookId: webhookId,
                  appId: appId,
                  scheduledFor: moment().add(2, "day").startOf("day").valueOf(),
                  payload: {
                    name: "Schedify",
                    active: true,
                    count: 42,
                    description: null,
                    data: {
                      items: ["webhook1", "webhook2"],
                      timestamp: "2024-12-12T10:00:00Z",
                    },
                  },
                  isTest: true,
                });

                revalidatePath("/");
              }}
            >
              <Button type="submit" size="sm" variant="ghost">
                Simulate
              </Button>
            </form>
          </li>
        </ul>

        <div className="flex flex-col">
          {logs.length === 0 ? (
            <p className="text-sm flex-1 text-muted-foreground text-center inline-flex items-center mx-auto gap-3">
              Looks empty here <LucideCat size={18} />
            </p>
          ) : null}

          {Object.entries(groupedLogs).map(([time, logs]) => (
            <div className="space-y-3" key={time}>
              <span className="font-semibold text-xs">
                {moment().format("YYYY-MM-DD") === time
                  ? "Today"
                  : moment().subtract(1, "day").format("YYYY-MM-DD") === time
                  ? "Yesterday"
                  : formatTime(time)}
              </span>

              {logs.map((log, index) => (
                <Link
                  href={`?eventId=${log.id}`}
                  key={log.id}
                  className={cn(
                    "flex flex-row items-center gap-3 cursor-pointer duration-100 p-1 rounded-lg",

                    log.id === eventId ? "bg-secondary" : "hover:bg-secondary",
                    index === 0 ? "bg-secondary" : ""
                  )}
                >
                  {log.status === "ERROR" ? (
                    <LucideCircleSlash size={18} />
                  ) : log.status === "CANCELED" ? (
                    <LucideCircleAlert size={18} />
                  ) : (log.retryCount ?? 0) > 0 ? (
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
                  ) : log.status === "COMPLETED" ? (
                    <LucideCheckCircle size={16} className="text-green-600" />
                  ) : null}

                  <h1 className="text-sm font-karla truncate" title={log.event}>
                    {log.event}
                  </h1>

                  <p className="ml-auto text-neutral-500 font-poppins">
                    {moment(log.updatedAt).format("HH:mm:ss")}
                  </p>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        {eventId || logs.at(0) ? (
          <Suspense
            fallback={
              <div className="absolute flex flex-col items-center gap-2 left-1/2 -translate-x-1/2 top-10">
                <LucideLoader2 className="animate-spin " size={20} />
                <span className="text-xs">Loading....</span>
              </div>
            }
          >
            <WebhookEventPayload
              webhookId={webhookId}
              eventId={(eventId || logs.at(0)?.id) ?? ""}
            />
          </Suspense>
        ) : null}
      </div>
    </div>
  );
};

const WebhookEventPayload: FC<{ webhookId: string; eventId: string }> = async ({
  webhookId,
  eventId,
}) => {
  const payload = await fetchWebhookEventPayload(webhookId, eventId);
  const syntaxHighlight = (data: string) => {
    const jsonString = JSON.stringify(data, null, 2);
    return jsonString.replace(
      /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?(e[+-]?\d+)?)/g,
      (match) => {
        let cls = "text-black";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "text-black"; // Keys in blue
          } else {
            cls = "text-green-600";
          }
        } else if (/true|false/.test(match)) {
          cls = "text-blue-600"; // Booleans in purple
        } else if (/null/.test(match)) {
          cls = "text-orange-600"; // Null in red
        } else if (/-?\d+(\.\d+)?(e[+-]?\d+)?/.test(match)) {
          cls = "text-red-600"; // Numbers in orange
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  };

  return (
    <div className="p-5 break-all">
      <pre
        className="break-words whitespace-pre-wrap"
        dangerouslySetInnerHTML={{
          __html: syntaxHighlight((payload?.payload as string) ?? ""),
        }}
      ></pre>
    </div>
  );
};

const Status: FC<{ enabled: boolean; className?: string }> = ({
  enabled,
  className,
}) => (
  <div
    className={cn(
      "text-center rounded text-sm font-semibold w-min px-2 mx-auto font-geist-sans",
      enabled ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500",
      className
    )}
  >
    {enabled ? "Enabled" : "Disabled"}
  </div>
);
