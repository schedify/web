import { Button } from "@/components/ui/button";
import { LucidePlus } from "lucide-react";
import Link from "next/link";

export default function Schedules() {
  return (
    <div className="container mt-10 space-y-10">
      <div className="space-y-5">
        <div className="flex flex-row justify-between">
          <h3 className="scroll-m-20 text-2xl font-[family-name:var(--font-geist-sans)] text-primary font-semibold tracking-tight">
            Schedules
          </h3>
          <Link href="schedules/create">
            <Button size={"sm"} variant={"secondary"}>
              <LucidePlus />
              Create custom schedule
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
