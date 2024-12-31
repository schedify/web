import { Button } from "@/components/ui/button";
import { LucidePlus } from "lucide-react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
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
            {new Array(5).fill(0).map((_, index) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
