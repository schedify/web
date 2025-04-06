import { CopyTextComponent } from "@/app/components/CopyText";
import { PageProps, WebhookEvent } from "@/app/types";
import { fetchWebhook, fetchWebhookLogs } from "@/app/utils/get-webhooks";
import { extractSearchParam, formatTime } from "@/app/utils/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { type FC } from "react";
import { ScheduleEventDialog } from "../_component/ScheduleEventDialog";
import { getAccessToken } from "@/app/utils/get-apps";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
            webhook={webhookRes.webhook}
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

        {/* <div className="flex flex-col bg-white p-5 border rounded-xl gap-3 text-sm w-full shadow-md">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Webhook Guide
          </h3>
        </div> */}
      </div>
    </div>
  );
}

const Logs = async ({
  params,
  webhook,
}: {
  params: {
    webhookId: string;
    status: string | null;
    eventId: string | null;
    page: number;
  };
  webhook: {
    secret: string;
    url: string;
    name: string;
  };
}) => {
  return (
    <>
      <div className="flex flex-col bg-white p-5 border rounded-xl gap-3 text-sm w-full shadow-md">
        <ul className="grid grid-cols-[repeat(2,80px)] border-b gap-5">
          <li className="pb-3 font-poppins relative text-center text-gray-500">
            <Link href={`/webhooks/${params.webhookId}/`}>Events</Link>
          </li>

          <li className="font-[500] font-poppins relative text-center pb-3">
            <Link href={`${params.webhookId}/settings`} className="font-medium">
              Settings
            </Link>

            <div className="h-[2px] bg-black absolute bottom-0 w-full animate-in fade-in duration-500"></div>
          </li>
        </ul>

        <div className="inline-flex items-center justify-between">
          <Label className="font-medium font-poppins">Signing Secret</Label>
          <CopyTextComponent
            className="cursor-pointer font-geist-mono"
            // className="cursor-pointer hover:bg-blue-50 px-1 py-0.5 rounded-md underline-offset-4 font-geist-mono hover:text-blue-500 "
            text={webhook.secret}
            hidden
          />
        </div>

        <hr />

        <div className="flex flex-col gap-2">
          <Label className="font-medium font-poppins">Name</Label>
          <Input name="name" defaultValue={webhook.name} />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-medium font-poppins">Endpoint</Label>
          <Input name="url" defaultValue={webhook.url} />
        </div>

        <Button size="sm">Update details</Button>
      </div>
    </>
  );
};
