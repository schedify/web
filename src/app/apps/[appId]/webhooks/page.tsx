import { fetchAppWebhooks } from "@/app/utils/get-apps";
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

export default async function Webhooks({
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
            Webhook endpoints
          </h3>
          <Link href="webhooks/create">
            <Button size={"sm"} variant={"secondary"}>
              <LucidePlus />
              Create Webhook
            </Button>
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-full">Destination</TableHead>
              <TableHead className="min-w-[100px] text-center">
                Status
              </TableHead>
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
                </TableRow>
              }
            >
              <WebhookEndpointsTable appId={appId} />
            </Suspense>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const WebhookEndpointsTable: FC<{ appId: string }> = async ({ appId }) => {
  const webhooks = await fetchAppWebhooks(appId);

  return webhooks.map((webhook) => (
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
  ));
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
