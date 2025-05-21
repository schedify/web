import { PageProps } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideChevronLeft, LucidePlus } from "lucide-react";
import Link from "next/link";

export default async function WebhookPage() {
  return (
    <div className="container my-10 space-y-10 pt-20">
      <div className="space-y-5">
        <div className="flex flex-col md:flex-row text-center md:text-left justify-between items-stretch md:items-start gap-5 md:gap-0">
          <div className="self-center space-y-2">
            <Skeleton className="min-h-[25px] min-w-[100px]" />
            <Skeleton className="min-h-[20px] min-w-[40px]" />
          </div>

          <Button size="lg">
            <LucidePlus className="stroke-[3px] size-4 mr-2" />
            Schedule Event
          </Button>
        </div>

        <div className="flex flex-col bg-white dark:bg-[#131313] p-5 border rounded-xl gap-3 text-sm w-full shadow-md">
          <ul className="grid grid-cols-[repeat(2,80px)] border-b gap-5">
            <li className="pb-3 font-poppins relative text-center text-gray-500">
              <Link href="" className="font-medium">
                Events
              </Link>

              <div className="h-[2px] bg-black absolute bottom-0 w-full animate-in fade-in duration-500"></div>
            </li>

            <li className="font-[500] font-poppins relative text-center pb-3">
              <Link href="" className="">
                Settings
              </Link>
            </li>
          </ul>

          <div className="flex flex-col">
            <div className="space-y-3">
              {new Array(5).fill(1).map((_, i) => (
                <Skeleton
                  className="min-h-[20] min-w-[60px]"
                  key={i.toString()}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
