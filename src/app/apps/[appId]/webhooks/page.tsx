import {
  fetchAppWebhooks,
  fetchAppWebhooksTotalCount,
} from "@/app/utils/get-apps";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  LucideCat,
  LucideMenu,
  LucidePlus,
  LucideToggleLeft,
  LucideToggleRight,
  LucideTrash2,
} from "lucide-react";
import Link from "next/link";
import { FC, Suspense } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { extractSearchParam } from "@/app/utils/utils";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

export default async function Webhooks({
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

  const totalPageCount = await fetchAppWebhooksTotalCount(appId);

  return (
    <div className="container mt-10 space-y-10">
      <div className="space-y-5">
        <div className="flex flex-col md:flex-row text-center md:text-left justify-between items-stretch md:items-start gap-5 md:gap-0">
          <div className="self-center">
            <h3 className="scroll-m-20 text-2xl font-geist-sans text-primary font-semibold tracking-tight">
              Webhook endpoints
            </h3>
            <p className="text-muted-foreground text-sm">
              Here you can manage your webhook endpoints.
            </p>
          </div>

          <Link href="webhooks/create" className="max-md:self-end">
            <Button size={"sm"} variant={"secondary"}>
              <LucidePlus />
              Create Webhook
            </Button>
          </Link>
        </div>
        <div className="shadow-md rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-full">Destination</TableHead>
                <TableHead className="min-w-[100px] text-center">
                  Status
                </TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <Suspense
                fallback={new Array(5).fill(0).map((_, index) => (
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
                  </TableRow>
                ))}
              >
                <WebhookEndpointsTable appId={appId} />
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

const WebhookEndpointsTable: FC<{ appId: string }> = async ({ appId }) => {
  const webhooks = await fetchAppWebhooks(appId);

  return webhooks.length > 0 ? (
    webhooks.map((webhook) => (
      <TableRow key={webhook.id} className="relative">
        <TableCell className="truncate font-semibold font-geist-mono hover:text-blue-500 hover:underline underline-offset-4">
          <Link href={`webhooks/${webhook.id}`} className="w-full">
            {webhook.url}
          </Link>
        </TableCell>
        <TableCell>
          <Status enabled={!!webhook.enabled} />
        </TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-7">
                <LucideMenu size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="text-sm cursor-pointer py-1">
                {webhook.enabled ? (
                  <LucideToggleLeft size={14} />
                ) : (
                  <LucideToggleRight size={14} />
                )}

                {webhook.enabled ? "Disable" : "Enable"}
              </DropdownMenuItem>
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
      <TableCell colSpan={3} className="text-center h-[100px]">
        <span className="inline-flex items-center gap-3 text-neutral-600">
          No webhooks found <LucideCat size={16} />
        </span>
      </TableCell>
    </TableRow>
  );
};

const Status: FC<{ enabled: boolean; className?: string }> = ({
  enabled,
  className,
}) => (
  <div
    className={cn(
      "text-center rounded text-sm font-semibold w-min px-2 mx-auto font-geist-sans",
      enabled ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500",
      className
    )}
  >
    {enabled ? "Enabled" : "Disabled"}
  </div>
);
