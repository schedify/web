import { fetchWebhookEvents } from "@/app/utils/get-webhooks";
import { formatDate, formatTime } from "@/app/utils/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LucideMenu, LucidePlus, LucideTrash2 } from "lucide-react";
import Link from "next/link";
import { FC, Suspense } from "react";

export default async function Schedules({
  params,
}: {
  params: Promise<{ [key: string]: string }>;
}) {
  const p = await params;

  const appId = p.appId;

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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead className="text-center">Payload</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Updated At</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Suspense
              fallback={
                <TableRow>
                  <TableCell>
                    <Skeleton className="min-h-[20px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="min-h-[20px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="min-h-[20px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="min-h-[20px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="min-h-[20px]" />
                  </TableCell>
                </TableRow>
              }
            >
              <ScheduleEventTable appId={appId} />
            </Suspense>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";

import { JSONCodeBlock } from "@/app/components/JSONCodeBlock";

const ScheduleEventTable: FC<{ appId: string }> = async ({ appId }) => {
  const events = await fetchWebhookEvents(appId);

  return events.map((webhook) => (
    <TableRow key={webhook.id}>
      <TableCell className="truncate font-semibold font-geist-mono hover:text-blue-500 hover:underline underline-offset-4">
        <Link href={`schedules/${webhook.id}`} className="w-full">
          {webhook.event}
        </Link>
      </TableCell>

      <Dialog>
        <DialogTrigger asChild>
          <TableCell className="truncate cursor-pointer font-geist-mono text-sm text-center max-w-[100px]">
            {JSON.stringify(webhook.payload).repeat(100)}
          </TableCell>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payload</DialogTitle>
          </DialogHeader>

          <JSONCodeBlock code={JSON.stringify(webhook.payload, null, 2)} />
        </DialogContent>
      </Dialog>
      <TableCell className="">
        <div className="font-geist-mono text-[10px] text-center bg-black text-white rounded-full  w-min mx-auto h-min px-2 py-0.5">
          {webhook.status}
        </div>
      </TableCell>
      <TableCell
        className="truncate text-sm text-center"
        title={formatDate(webhook.updatedAt)}
      >
        {formatTime(webhook.updatedAt)}
      </TableCell>

      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="h-7">
              <LucideMenu size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <DropdownMenuItem className="text-sm cursor-pointer py-1">
              {webhook.enabled ? (
                <LucideToggleLeft size={14} />
              ) : (
                <LucideToggleRight size={14} />
              )}

              {webhook.enabled ? "Disable" : "Enable"}
            </DropdownMenuItem> */}
            <DropdownMenuItem className="text-sm cursor-pointer py-1 text-red-500 focus:text-red-500">
              <LucideTrash2 size={14} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  ));
};
