import { PageProps, WebhookEvent } from "@/app/types";
import { fetchWebhook, fetchWebhookLogs } from "@/app/utils/get-webhooks";
import { extractSearchParam, formatTime } from "@/app/utils/utils";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import {
  LucideCat,
  LucideCheckCircle,
  LucideCircleAlert,
  LucideCircleSlash,
  LucideDot,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { redirect } from "next/navigation";
import { type FC } from "react";
import { ScheduleEventDialog } from "./_component/ScheduleEventDialog";
import { getAccessToken } from "@/app/utils/get-apps";
import { StatusFilter, StatusTimeFilter } from "./_component/DateAndTimeFilter";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";

export default async function WebhookPage({ searchParams, params }: PageProps) {
  const [p, s] = await Promise.all([params, searchParams]);

  const webhookIdParams = Array.isArray(p.webhookId)
    ? p.webhookId.at(0)
    : p.webhookId;
  if (!webhookIdParams) {
    throw redirect("/webhooks");
  }

  const [status, eventId, page] = [s.status, s.eventId, s.page].map(
    extractSearchParam
  );

  const webhookRes = await fetchWebhook(webhookIdParams);
  if (!webhookRes.status) {
    throw new Error(webhookRes.message);
  }

  return (
    <div className="container my-10 space-y-10 pt-20">
      <div className="space-y-5">
        <div className="flex flex-col md:flex-row text-center md:text-left justify-between items-stretch md:items-start gap-5 md:gap-0">
          <div className="self-center">
            <h3 className="scroll-m-20 text-2xl font-geist-sans text-primary font-semibold tracking-tight">
              {webhookRes.webhook.name}
            </h3>
            <p className="text-muted-foreground italic text-sm">
              {webhookRes.webhook.url}
            </p>
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
      <div className="flex flex-col bg-[#131313] p-5 border rounded-xl gap-3 text-sm w-full shadow-md">
        <ul className="grid grid-cols-[repeat(2,80px)] border-b  gap-5">
          <li className="font-[500] font-poppins relative text-center pb-3">
            <Link
              href={`/webhooks/${params.webhookId}/`}
              className="font-medium"
            >
              Events
            </Link>

            {params.status === null || params.status === "all" ? (
              <div className="h-[2px] bg-blue-500 absolute bottom-0 w-full animate-in fade-in duration-500"></div>
            ) : null}
          </li>

          <li className="pb-3 font-poppins relative text-gray-500 text-center">
            <Link href={`${params.webhookId}/settings`} className="">
              Settings
            </Link>

            {/* {params.status === null || params.status === "all" ? (
              <div className="h-[2px] bg-black absolute bottom-0 w-full animate-in fade-in duration-500"></div>
            ) : null} */}
          </li>
        </ul>

        <div />

        <ul className="flex flex-row items-center gap-3 pb-3">
          <StatusFilter />
          {/* <StatusTimeFilter /> */}
        </ul>

        <Accordion type="single" collapsible>
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

                {logs.map((log: WebhookEvent) => (
                  <AccordionItem value={log.id} key={log.id}>
                    <AccordionTrigger>
                      <div
                        key={log.id}
                        className="flex flex-row items-center gap-3"
                      >
                        {log.status === "ERRORED" ? (
                          <LucideCircleSlash size={18} />
                        ) : log.status === "CANCELLED" ? (
                          <LucideCircleAlert size={18} />
                        ) : log.status === "DELIVERED" ? (
                          <LucideCheckCircle
                            size={16}
                            className="text-green-600"
                          />
                        ) : log.status === "PENDING" ? (
                          <LucideDot size={16} />
                        ) : null}

                        <h1
                          className="text-sm font-karla truncate"
                          title={log.event_name}
                        >
                          {log.event_name}
                        </h1>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent>
                      <div className="flex flex-col gap-3">
                        <Label>
                          Status: <b>{log.status}</b>
                        </Label>

                        <Label>
                          Scheduled:{" "}
                          <b>
                            {new Date(
                              log.scheduled_for * 1000
                            ).toLocaleString()}
                          </b>
                        </Label>

                        {log.processed_at > 0 ? (
                          <Label>
                            Processed at:{" "}
                            <b>
                              {new Date(
                                log.processed_at * 1000
                              ).toLocaleString()}
                            </b>
                          </Label>
                        ) : null}

                        <WebhookEventPayload payload={log.payload} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>
            ))}
          </div>
        </Accordion>
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
      }
    );
  };

  return (
    <div className="py-5 break-all flex flex-col h-full">
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
