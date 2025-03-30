import { PageProps } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideChevronLeft, LucidePlus } from "lucide-react";
import Link from "next/link";

export default async function WebhookPage() {
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
            <Skeleton className="min-h-[32px] min-w-[50px]" />
            <Skeleton className="min-h-[20px] min-w-[40px]" />
          </div>

          <Button size={"sm"} variant={"secondary"} className="max-md:self-end">
            <LucidePlus />
            Schedule Event
          </Button>
        </div>

        <div>
          <div className="grid grid-cols-3 p-5 border rounded-xl gap-3 text-sm w-full divide-x shadow-md">
            <div className="col-span-2">
              <ul className="flex flex-row items-center gap-3 pb-3">
                <li className="pb-1 font-[500] font-poppins relative border-black text-black">
                  <Link href="?">All</Link>
                  <div className="h-[2px] bg-black absolute bottom-0 w-full animate-in fade-in duration-500"></div>
                </li>
                <li className="pb-1 font-[500] font-poppins relative text-gray-500">
                  <Link href="?status=success">Succeeded</Link>
                </li>
                <li className="pb-1 font-[500] font-poppins relative text-gray-500">
                  <Link href="?status=error">Error</Link>
                </li>
              </ul>

              <div className="flex flex-col">
                <div className="space-y-3">
                  <Skeleton className="min-h-[10px] min-w-[20px]" />

                  {new Array(5).fill(1).map((_, i) => (
                    <Skeleton
                      className="min-h-[36] min-w-[60px]"
                      key={i.toString()}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
