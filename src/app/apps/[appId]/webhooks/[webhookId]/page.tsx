import { PageProps } from "@/app/types";
import { fetchAppWebhook } from "@/app/utils/get-webhooks";
import { redirect } from "next/navigation";
import { Status } from "../page";
import { formatDate, formatTime } from "@/app/utils/utils";
import { Button } from "@/components/ui/button";
import {
  LucideRotateCw,
  LucideToggleLeft,
  LucideToggleRight,
} from "lucide-react";
import { CopyTextComponent } from "@/app/components/CopyText";
import { FC } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function WebhookRoute({
  params,
  searchParams,
}: PageProps) {
  const p = await params;
  const s = await searchParams;

  const webhook = await fetchAppWebhook(p.appId, p.webhookId);
  if (!webhook) {
    redirect(`/apps/${p.appId}/webhooks`);
  }

  const logStatus =
    (Array.isArray(s.status) ? s.status.at(0) : s.status) || "all";

  return (
    <div className="container mt-10 space-y-10">
      <div className="text-lg inline-flex items-center gap-3 font-poppins">
        Webhook:{" "}
        <CopyTextComponent
          text={webhook.id}
          className="font-semibold hover:bg-secondary duration-150 px-2 py-0 rounded-lg hover:shadow cursor-pointer font-geist-mono"
        />
      </div>

      <div className="p-5 border rounded-xl grid grid-rows-3 gap-3 text-sm w-full">
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
          <div className="text-gray-600 text-sm font-poppins">
            Signing Secret
          </div>

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
          <span className="text-gray-600 text-sm font-poppins">
            Created at{" "}
          </span>
          <div className="font-karla">{formatDate(webhook.createdAt)}</div>
        </div>

        <div className="space-x-2 flex flex-row items-center">
          <span className="text-gray-600 text-sm font-poppins">Updated at</span>
          <div className="font-karla">{formatDate(webhook.updatedAt)}</div>
        </div>
      </div>

      <WebhookLogs logStatus={logStatus} />
    </div>
  );
}

const WebhookLogs: FC<{ logStatus: string }> = ({ logStatus }) => {
  return (
    <div className="p-5 border rounded-xl grid grid-rows-3 gap-3 text-sm w-full">
      <ul className="flex flex-row items-center gap-3">
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
      </ul>
    </div>
  );
};
