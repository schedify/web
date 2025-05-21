import { Skeleton } from "@/components/ui/skeleton";
import DashboardNav from "@/components/DashboardNav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LucideChevronLeft } from "lucide-react";

export default function Loading() {
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

      <div className="p-5 border bg-white dark:bg-[#131313]  rounded-xl grid grid-rows-1 gap-2 text-sm w-full shadow-md">
        <div className="flex justify-between">
          <span>API Key</span>
          <Skeleton className="h-[12px] w-[100px]" />
        </div>
      </div>
    </div>
  );
}
