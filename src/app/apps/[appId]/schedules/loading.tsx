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

import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

export default function Loading() {
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

        <div>
          <PaginationWithLinks page={1} pageSize={20} totalCount={1} />
        </div>
      </div>
    </div>
  );
}
