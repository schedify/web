import { redirect } from "next/navigation";

export default async function WebhooksRoute() {
  // export const getAccessToken = async () => {
  //   return (await cookies()).get("__session")?.value || null;
  // };

  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  return (
    <div className="container space-y-10 pt-20">
      <div className="mt-8">
        <h3 className="scroll-m-20 text-2xl font-poppins font-semibold tracking-tight text-primary">
          Webhooks
        </h3>
        <p className="mt-2 text-gray-600">
          A webhook sends real-time notifications to a URL when an event happens
          in your app.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 font-geist-mono">
        <CreateWebhookModel accessToken={(await getAccessToken()) || ""} />

        <Suspense
          fallback={
            <>
              <Skeleton className="min-h-[200px]" />
              <Skeleton className="min-h-[200px]" />
            </>
          }
        >
          <UserWebhooks />
        </Suspense>
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { LucideArrowRight, LucidePlus } from "lucide-react";
import { FC, Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { fetchWebhooks, getAccessToken } from "../utils/get-apps";
import { formatTime } from "../utils/utils";
import { CreateWebhookModel } from "./_components/CreateWebhookModel";

const UserWebhooks = async () => {
  const webhookRes = await fetchWebhooks();
  if (!webhookRes.status) {
    throw new Error(webhookRes.message);
  }

  return webhookRes.webhooks.map((webhook) => (
    <Link
      href={`/webhooks/${webhook.id}`}
      key={webhook.id}
      className="flex flex-col border rounded-lg min-h-[200px] bg-primary  cursor-pointer border-neutral-100 dark:border-neutral-700 group p-1 gap-1 hover:shadow-xl duration-100"
    >
      <div className="flex-1 bg-white dark:bg-neutral-950 flex flex-col rounded-md  shadow">
        <h1 className="text-sm font-bold mt-auto p-3 text-primary">
          {webhook.name}
        </h1>
      </div>

      <div className="px-2 py-1 text-[10px] flex flex-row items-center justify-between">
        <div className=" font-medium text-secondary">
          Updated {formatTime(webhook.updated_at * 1000)}
        </div>

        <div className="inline-flex items-center  gap-2">
          <span>Go to app</span> <LucideArrowRight size={10} />
        </div>
      </div>
    </Link>
  ));
};
