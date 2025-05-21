import { CopyTextComponent } from "@/components/CopyText";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchMe } from "../utils/get-apps";
import DashboardNav from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";
import { LucideChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function Settings() {
  const user = await currentUser();
  if (!user) throw redirect("/");

  const meResp = await fetchMe();
  if (meResp.status === 0) {
    throw new Error(meResp.message);
  }

  return (
    <div className="container space-y-10 pt-20">
      <Link href="/webhooks">
        <Button className="inline-flex items-center gap-3">
          <LucideChevronLeft />
          Back to webhooks
        </Button>
      </Link>

      <h3 className="text-2xl font-[family-name:var(--font-geist-sans)] text-primary font-semibold tracking-tight">
        Developer
      </h3>

      <div className="p-5 border bg-white dark:bg-[#131313] rounded-xl grid grid-rows-1 gap-5 text-sm w-full shadow-md">
        <div className="flex justify-between items-center">
          <span>API Key</span>
          <CopyTextComponent
            className="cursor-pointer  px-1 py-0.5 rounded-md underline-offset-4 font-geist-mono hover:text-blue-500 "
            text={meResp.data.api_key}
            hidden
          />
        </div>
      </div>
    </div>
  );
}
