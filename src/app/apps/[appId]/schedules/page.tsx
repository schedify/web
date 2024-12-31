import {
  fetchWebhookEvents,
  fetchWebhookEventsTotalCount,
} from "@/app/utils/get-webhooks";
import { extractSearchParam, formatDate, formatTime } from "@/app/utils/utils";
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
import { LucideCat, LucideMenu, LucidePlus, LucideTrash2 } from "lucide-react";
import Link from "next/link";
import { FC, Suspense } from "react";

export default async function Schedules({
  params,
  searchParams,
}: {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [p, s] = await Promise.all([params, searchParams]);

  const appId = p.appId;

  const user = await currentUser();
  if (!user) throw redirect("/");

  if (!user.publicMetadata.apps.some((app) => app.id === appId))
    throw redirect("/");

  const page = parseInt(extractSearchParam(s.page) || "1");
  const pageSize = parseInt(extractSearchParam(s.pageSize) || "20");

  const totalPageCount = await fetchWebhookEventsTotalCount(appId);

  return (
    <div className="container mt-10 space-y-10">
      <div className="space-y-5">
        <div className="flex flex-row justify-between">
          <div>
            <h3 className="scroll-m-20 text-2xl font-[family-name:var(--font-geist-sans)] text-primary font-semibold tracking-tight">
              Schedules
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage and view your scheduled events below.
            </p>
          </div>
          <Link href="schedules/create">
            <Button size={"sm"} variant={"secondary"}>
              <LucidePlus />
              Create custom schedule
            </Button>
          </Link>
        </div>

        <div className="shadow-md rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Event</TableHead>
                <TableHead className="text-center">Payload</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Updated At</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <Suspense
                fallback={new Array(5).fill(0).map((_, index) => (
                  <TableRow key={index.toString()}>
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
                ))}
              >
                <ScheduleEventTable
                  appId={appId}
                  page={page}
                  pageSize={pageSize}
                />
              </Suspense>
            </TableBody>
          </Table>
        </div>

        <div>
          <PaginationWithLinks
            page={page}
            pageSize={pageSize}
            totalCount={totalPageCount}
          />
        </div>
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

const ScheduleEventTable: FC<{
  appId: string;
  page: number;
  pageSize: number;
}> = async ({ appId, page, pageSize }) => {
  const events = await fetchWebhookEvents(appId, page, pageSize);

  return events.length > 0 ? (
    events.map((webhook) => (
      <TableRow key={webhook.id}>
        <TableCell className="truncate font-semibold font-geist-mono hover:text-blue-500 hover:underline underline-offset-4">
          <Link href={`schedules/${webhook.id}`} className="w-full">
            {webhook.event}
          </Link>
        </TableCell>

        <Dialog>
          <DialogTrigger asChild>
            <TableCell className="truncate cursor-pointer font-geist-mono text-sm text-center max-w-[100px]">
              {JSON.stringify(webhook.payload)}
            </TableCell>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payload</DialogTitle>
            </DialogHeader>

            <JSONCodeBlock code={JSON.stringify(webhook.payload, null, 2)} />
          </DialogContent>
        </Dialog>
        <TableCell className="text-center">
          <Badge
            variant="outline"
            className="gap-1.5 mx-auto tracking-tight text-xs rounded-full"
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                webhook.status === "PENDING" && "bg-amber-500",
                webhook.status === "COMPLETED" && "bg-green-500",
                ["ERROR", "CANCELED"].includes(webhook.status) && "bg-red-500"
              )}
              aria-hidden="true"
            ></span>
            {webhook.status}
          </Badge>
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
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={5} className="text-center h-[100px]">
        <span className="inline-flex items-center gap-3 text-neutral-600">
          No schedules found
          <LucideCat size={16} />
        </span>
      </TableCell>
    </TableRow>
  );
};
