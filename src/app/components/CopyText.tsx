"use client";

import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";

export const CopyTextComponent: FC<{
  text: string;
  hidden?: boolean;
  className?: string;
}> = ({ text, className, hidden }) => {
  const [reveal, setReveal] = useState(false);

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => {
        if (hidden && !reveal) {
          setReveal((prev) => !prev);
          return;
        }

        navigator.clipboard.writeText(text);
        toast({
          title: "Copied to clipboard",
          variant: "default",
        });
      }}
    >
      <span
        className={cn(
          "px-1 py-0.5 rounded-md  underline-offset-4",
          !reveal ? "blur-sm" : "hover:bg-blue-50 ",
        )}
      >
        {text}
      </span>

      {hidden && !reveal ? (
        <span className="absolute left-1/2 top-1/2 -translate-y-1/2 rounded-full -translate-x-1/2 text-center font-semibold bg-secondary px-2 text-xs">
          Click to reveal
        </span>
      ) : null}
    </div>
  );
};
