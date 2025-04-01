import { CopyTextComponent } from "@/app/components/CopyText";
import { PageProps, WebhookEvent } from "@/app/types";
import { fetchWebhook, fetchWebhookLogs } from "@/app/utils/get-webhooks";
import { extractSearchParam, formatTime } from "@/app/utils/utils";
import { Button } from "@/components/ui/button";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { cn } from "@/lib/utils";
import {
  LucideCat,
  LucideCheckCircle,
  LucideChevronLeft,
  LucideCircleAlert,
  LucideCircleSlash,
  LucideDot,
  LucideEllipsis,
  LucidePlus,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { redirect } from "next/navigation";
import { type FC } from "react";
import { ScheduleEventDialog } from "./_component/ScheduleEventDialog";
import { getAccessToken } from "@/app/utils/get-apps";

export default async function WebhookPage({ searchParams, params }: PageProps) {
  const [p, s] = await Promise.all([params, searchParams]);

  const webhookIdParams = Array.isArray(p.webhookId)
    ? p.webhookId.at(0)
    : p.webhookId;
  if (!webhookIdParams) {
    throw redirect("/webhooks");
  }

  const [status, eventId, page] = [s.status, s.eventId, s.page].map(
    extractSearchParam,
  );

  const webhookRes = await fetchWebhook(webhookIdParams);
  if (!webhookRes.status) {
    return <div>{webhookRes.message}</div>;
  }

  return (
    <div className="container my-10 space-y-10">
      <Link href={`/webhooks`}>
        <Button variant="link" size="sm">
          <LucideChevronLeft /> Back
        </Button>
      </Link>

      <div className="space-y-5">
        <div className="flex flex-col md:flex-row text-center md:text-left justify-between items-stretch md:items-start gap-5 md:gap-0">
          <div className="self-center">
            <h3 className="scroll-m-20 text-2xl font-geist-sans text-primary font-semibold tracking-tight">
              {webhookRes.data.name}
            </h3>
            <p className="text-muted-foreground italic text-sm">
              {webhookRes.data.url}
            </p>
            <div className="inline-flex items-center gap-0.5 italic text-sm">
              <span className="font-bold">Secret:</span>
              <CopyTextComponent
                className="cursor-pointer hover:bg-blue-50 px-1 py-0.5 rounded-md underline-offset-4 font-geist-mono hover:text-blue-500 "
                text={webhookRes.data.secret}
                hidden
              />
            </div>
          </div>

          <ScheduleEventDialog
            accessToken={(await getAccessToken()) || ""}
            webhookId={webhookIdParams}
          />
        </div>

        <div className="space-y-5">
          <Logs
            params={{
              eventId: eventId,
              status: status,
              webhookId:
                (Array.isArray(p.webhookId)
                  ? p.webhookId.at(0)
                  : p.webhookId) || "",
              page: Number(page) || 0,
            }}
          />
        </div>
      </div>
    </div>
  );
}

const Logs = async ({
  params,
}: {
  params: {
    webhookId: string;
    status: string | null;
    eventId: string | null;
    page: number;
  };
}) => {
  const logsRes = await fetchWebhookLogs(params.webhookId, "");
  if (!logsRes.status) {
    return <div>{logsRes.message}</div>;
  }

  const grouped = new Map<string, WebhookEvent[]>();

  for (const log of logsRes.events) {
    const dateKey = new Date(log.updated_at * 1000).toISOString().split("T")[0];
    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, []);
    }

    grouped.get(dateKey)!.push(log);
  }

  return (
    <>
      <div className="grid grid-cols-3 p-5 border rounded-xl gap-3 text-sm w-full divide-x shadow-md">
        <div className="col-span-2">
          <ul className="flex flex-row items-center gap-3 pb-3">
            <li
              className={cn(
                "pb-1 font-[500] font-poppins relative",
                params.status === null || params.status === "all"
                  ? "border-black text-black"
                  : "text-gray-500",
              )}
            >
              <Link href="?">All</Link>

              {params.status === null || params.status === "all" ? (
                <div className="h-[2px] bg-black absolute bottom-0 w-full animate-in fade-in duration-500"></div>
              ) : null}
            </li>
            <li
              className={cn(
                "pb-1 font-[500] font-poppins relative",
                params.status === "success" ? "text-black" : "text-gray-500",
              )}
            >
              <Link href="?status=success">Succeeded</Link>

              {params.status === "success" ? (
                <div className="h-[2px] bg-black absolute bottom-0 w-full animate-in fade-in duration-500"></div>
              ) : null}
            </li>
            <li
              className={cn(
                "pb-1 font-[500] font-poppins relative ",
                params.status === "error" ? "text-black" : "text-gray-500",
              )}
            >
              <Link href="?status=error">Error</Link>

              {params.status === "error" ? (
                <div className="h-[2px] bg-black absolute bottom-0 w-full animate-in fade-in duration-500"></div>
              ) : null}
            </li>
          </ul>

          <div className="flex flex-col gap-3">
            {logsRes.events.length === 0 ? (
              <p className="text-sm flex-1 text-muted-foreground text-center inline-flex items-center mx-auto gap-3">
                Looks empty here <LucideCat size={18} />
              </p>
            ) : null}

            {Array.from(grouped.entries()).map(([time, logs]) => (
              <div className="space-y-3" key={time}>
                <span className="font-semibold text-xs">
                  {moment().format("YYYY-MM-DD") === time
                    ? "Today"
                    : moment().subtract(1, "day").format("YYYY-MM-DD") === time
                      ? "Yesterday"
                      : formatTime(time)}
                </span>

                {logs.map((log: WebhookEvent, index: number) => (
                  <Link
                    href={`?eventId=${log.id}`}
                    key={log.id}
                    className={cn(
                      "flex flex-row items-center gap-3 cursor-pointer duration-100 p-1 rounded-lg hover:bg-secondary/50",
                      params.eventId === log.id && "bg-secondary/50 shadow",

                      // log.id === params.eventId ||
                      //   (!params.eventId && index === 0)
                      //
                      //   : "",
                    )}
                  >
                    {log.status === "ERRORED" ? (
                      <LucideCircleSlash size={18} />
                    ) : log.status === "CANCELLED" ? (
                      <LucideCircleAlert
                        size={18}
                      /> /*: (log.retryCount ?? 0) > 0 ? (
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
                    ) : log.status === "DELIVERED" ? (
                      <LucideCheckCircle size={16} className="text-green-600" />
                    ) : log.status === "PENDING" ? (
                      <LucideDot size={16} />
                    ) : null}

                    <h1
                      className="text-sm font-karla truncate"
                      title={log.event_name}
                    >
                      {log.event_name}
                    </h1>

                    <p className="ml-auto text-xs text-neutral-500 font-poppins">
                      {moment(log.updated_at).format("HH:mm:ss")}
                    </p>
                    {/*
                    <Button size="icon" variant="ghost">
                      <LucideEllipsis className="h-3 w-3" />
                    </Button> */}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* if we have event ud, show its payload */}
          {params.eventId ? (
            <WebhookEventPayload
              payload={
                logsRes.events.find((log) => log.id === params.eventId)
                  ?.payload || ""
              }
            />
          ) : null}
        </div>
      </div>

      <div>
        <PaginationWithLinks
          page={Number(logsRes.count) || 0}
          pageSize={20}
          totalCount={logsRes.count}
        />
      </div>
    </>
  );
};

const WebhookEventPayload: FC<{ payload: string }> = async ({ payload }) => {
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
      },
    );
  };

  return (
    <div className="p-5 break-all flex flex-col h-full">
      {payload == null || payload === "" ? (
        <p className="text-sm flex-1 text-muted-foreground text-center inline-flex items-center mx-auto gap-3 m-auto">
          No Payload <LucideCat size={18} />
        </p>
      ) : (
        <pre
          className="break-words whitespace-pre-wrap"
          dangerouslySetInnerHTML={{
            __html: syntaxHighlight(payload),
          }}
        />
      )}
    </div>
  );
};
