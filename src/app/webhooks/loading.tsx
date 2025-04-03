import { Skeleton } from "@/components/ui/skeleton";
import { LucidePlus } from "lucide-react";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="container space-y-10">
      <div className="mt-8">
        <h3 className="scroll-m-20 text-2xl font-poppins font-semibold tracking-tight text-primary">
          Webhooks
        </h3>
        <p className="mt-2 text-gray-600">
          A webhook sends real-time notifications to a URL when an event happens
          in your app.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 font-[family-name:var(--font-geist-mono)] ">
        <Skeleton className="min-h-[200px]" />
        <Skeleton className="min-h-[200px]" />
        <Skeleton className="min-h-[200px]" />
      </div>
    </div>
  );
}
