import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LucideCalendar, LucidePlusCircle } from "lucide-react";
import { FC } from "react";

export const StatusFilter: FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="inline-flex items-center select-none gap-2 border border-dashed border-neutral-400 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 duration-150 px-2 py-0.5 rounded-full cursor-pointer">
          <LucidePlusCircle
            size={12}
            className="stroke-neutral-700 dark:stroke-neutral-200"
          />
          <span className="text-xs font-poppins text-neutral-700 dark:text-neutral-200">
            Status
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="space-y-5">
        <h3 className="text-base font-semibold font-geist-sans">
          Filter by Status
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="pending" />
            <label
              htmlFor="pending"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Pending
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="failed" />
            <label
              htmlFor="failed"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Failed
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="delivered" />
            <label
              htmlFor="delivered"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Delivered
            </label>
          </div>
        </div>

        <Button className="w-full" size="sm">
          Apply
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export const StatusTimeFilter: FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="inline-flex items-center select-none gap-2 border border-dashed border-neutral-400 hover:bg-neutral-100 duration-150 px-2 py-0.5 rounded-full cursor-pointer">
          <LucidePlusCircle size={12} className="stroke-neutral-700" />
          <span className="text-xs font-poppins text-neutral-700">
            Date and Time
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="space-y-5">
        <h3 className="text-base font-semibold font-geist-sans">
          Filter by Date and Time
        </h3>

        <div>
          <div>
            <LucideCalendar size={16} />
          </div>
          <span>and</span>
          <div>
            <LucideCalendar size={16} />
          </div>
        </div>

        <Button className="w-full" size="sm">
          Apply
        </Button>
      </PopoverContent>
    </Popover>
  );
};
