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
import { LucideMenu } from "lucide-react";
import { FC } from "react";

export default function Configure() {
  return (
    <div className="container mt-10 space-y-10">
      <div className="space-y-5">
        <h3 className="text-2xl font-[family-name:var(--font-geist-sans)] text-primary font-semibold tracking-tight">
          Webhooks
        </h3>

        <Table>
          <TableCaption>A list of your app's webhooks.</TableCaption>
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
            <TableRow>
              <TableCell>Paid</TableCell>
              <TableCell>
                <Status enabled />{" "}
              </TableCell>
              <TableCell className="text-right">
                <Button size="icon" variant="outline" className="h-7">
                  <LucideMenu size={14} />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const Status: FC<{ enabled: boolean }> = ({ enabled }) => (
  <div
    className={cn(
      "text-center rounded font-bold",
      enabled ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"
    )}
  >
    {enabled ? "Enabled" : "Disabled"}
  </div>
);
