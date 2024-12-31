"use client";

import { LucideArrowLeft, LucideAtSign, LucideHome } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] md:min-w-[500px] space-y-3">
      <h1 className="scroll-m-20 text-neutral-700 dark:text-neutral-300 text-4xl font-extrabold tracking-tight lg:text-5xl">
        4:04 | Not Found
      </h1>
      <p className="text-primary text-neutral-400">
        Could not find requested resource
      </p>
      <div className="flex flex-row items-center divide-x justify-between ">
        <Link
          href="/"
          className="inline-flex items-center gap-2 underline underline-offset-2 mt-4 pr-5 md:pr-10"
        >
          <LucideHome size={14} />
          Home
        </Link>

        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 underline underline-offset-2 mt-4 pr-5 md:pr-10 pl-4 md:pl-8"
        >
          <LucideArrowLeft size={14} />
          Go back
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 underline underline-offset-2 mt-4 pl-4 md:pl-8"
        >
          <LucideAtSign size={14} />
          Support
        </Link>
      </div>
    </div>
  );
}
