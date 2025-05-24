import { Event, PageProps } from "@/app/types";
import { CreateTaskForm } from "../_comp/CreateTaskForm";
import { FC, Suspense } from "react";

const fetchWebhookEvents = async (id: string, page: number) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/schedule/${id}/events?page=${page}`
    );
    const res = await resp.json();
    return {
      events: res.events as Event[],
      count: res.count,
      webhookSecret: res.webhookSecret || null,
    };
  } catch {
    return {
      events: [],
      count: 0,
      webhookSecret: null,
    };
  }
};

export default async function ScheduleEvents({
  params,
  searchParams,
}: PageProps) {
  const [p, s] = await Promise.all([params, searchParams]);
  const id = p.id;
  const page = Number(Array.isArray(s.page) ? p.page?.[0] : s.page) || 0;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-x divide-border">
      <CreateTaskForm samplePosition="bottom" />

      {/* have all events */}
      <Suspense>
        <EventsContainer
          id={Array.isArray(id) ? id.at(0) || "" : id}
          page={page}
        />
      </Suspense>
    </section>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LucideCat,
  LucideCheckCircle,
  LucideCircleAlert,
  LucideCircleSlash,
  LucideDot,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

const EventsContainer = async ({ id, page }: { id: string; page: number }) => {
  const eventsResp = await fetchWebhookEvents(id, page);

  return (
    <div>
      {eventsResp.webhookSecret ? (
        <div className="text-sm p-5">
          <span className="text-white font-medium text-lg">
            Webhook Signing Secret:
          </span>
          <code className="block mt-1 text-sm bg-gray-100 dark:bg-neutral-800 dark:text-gray-200 p-2 rounded break-all">
            {eventsResp.webhookSecret}
          </code>
        </div>
      ) : null}

      <Accordion type="single" collapsible>
        {eventsResp.events.map((event) => (
          <AccordionItem key={event.id} value={event.id}>
            <AccordionTrigger className="px-5">
              <div className="flex flex-row items-center  gap-3">
                {event.status === "ERRORED" ? (
                  <LucideCircleSlash size={18} />
                ) : event.status === "CANCELLED" ? (
                  <LucideCircleAlert size={18} />
                ) : event.status === "DELIVERED" ? (
                  <LucideCheckCircle size={16} className="text-green-600" />
                ) : event.status === "PENDING" ? (
                  <LucideDot size={16} />
                ) : null}

                <h1 className="text-sm truncate" title={event.name}>
                  {event.name}
                </h1>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="flex flex-col gap-3 px-2 py-1">
                <Label>
                  Status: <b>{event.status}</b>
                </Label>

                <Label>
                  Scheduled:{" "}
                  <b>{new Date(event.scheduled_for * 1000).toLocaleString()}</b>
                </Label>

                {event.processed_at > 0 && (
                  <Label>
                    Processed at:{" "}
                    <b>
                      {new Date(event.processed_at * 1000).toLocaleString()}
                    </b>
                  </Label>
                )}

                <Label>
                  Created at:{" "}
                  <b>{new Date(event.created_at * 1000).toLocaleString()}</b>
                </Label>

                {event.next_retry_at > 0 && (
                  <Label>
                    Next retry at:{" "}
                    <b>
                      {new Date(event.next_retry_at * 1000).toLocaleString()}
                    </b>
                  </Label>
                )}

                {event.tries && (
                  <div className="mt-2">
                    <Label className="mb-1 block font-semibold">Tries:</Label>
                    <ul className="pl-4 list-disc space-y-1 text-sm text-gray-700">
                      {event.tries.map((t) => (
                        <li key={t.at}>
                          Attempt #{t.attempt} at{" "}
                          {new Date(t.at * 1000).toLocaleString()} — Status:{" "}
                          <b>{t.status_code ?? "N/A"}</b>
                          {t.error_reason ? ` — Error: ${t.error_reason}` : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <Label className="font-semibold">Payload:</Label>
                  <WebhookEventPayload payload={event.payload} />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div>
        <PaginationWithLinks
          page={Number(eventsResp.count) || 0}
          pageSize={20}
          totalCount={eventsResp.count}
        />
      </div>
    </div>
  );
};

const WebhookEventPayload: FC<{ payload: string }> = async ({ payload }) => {
  const syntaxHighlight = (data: string) => {
    const jsonString = JSON.stringify(data, null, 2);
    return jsonString.replace(
      /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?(e[+-]?\d+)?)/g,
      (match) => {
        let cls = "text-white";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "text-white";
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
        return `<span class="${cls} text-xs">${match}</span>`;
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
