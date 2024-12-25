import { Skeleton } from "@/components/ui/skeleton";
import { LucidePlus } from "lucide-react";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="container space-y-10">
      <h3 className="mt-8 scroll-m-20 text-2xl font-[family-name:var(--font-geist-sans)] text-primary font-semibold tracking-tight">
        Applications
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 font-[family-name:var(--font-geist-mono)] ">
        <Link
          href="/apps/create"
          className="flex flex-col items-center justify-center border border-dashed gap-3 rounded-lg min-h-[200px] bg-primary dark:bg-neutral-900 text-secondary cursor-pointer border-primary group hover:shadow-xl duration-100"
        >
          <LucidePlus
            className="group-hover:rotate-180 duration-150"
            size={18}
          />
          <span>Create application</span>
        </Link>
        <Skeleton className="min-h-[200px]" />
        <Skeleton className="min-h-[200px]" />
      </div>
    </div>
  );
}
