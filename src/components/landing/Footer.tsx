import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="min-h-[400px] relative flex flex-col gap-10 py-10 overflow-hidden">
      <div className="flex flex-row w-full justify-end pr-10 gap-10">
        <div className="flex flex-col gap-7 self-end">
          <h1 className="text-gray-300 font-bold">Legal</h1>

          <div className="text-sm flex flex-col gap-3">
            <Link
              className="hover:underline underline-offset-2 "
              href="/legal/terms"
            >
              Terms of Service
            </Link>
            <Link
              className="hover:underline underline-offset-2 "
              href="/legal/privacy"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="flex relative">
          <div className="size-[10px] bg-background border border-border rounded-[2px] absolute top-[-5px] left-[-4.5px]"></div>
          <div className="w-px bg-border min-h-[70px]"></div>
          <div className="size-[10px] bg-background border border-border rounded-[2px] absolute bottom-[-5px] left-[-4.5px]"></div>
        </div>

        <div className="flex flex-col gap-7 self-end">
          <h1 className="text-gray-300 font-bold">Company</h1>

          <div className="text-sm flex flex-col gap-3">
            <Link
              className="hover:underline underline-offset-2 "
              href="/legal/terms"
            >
              Contact us
            </Link>
            <Link
              className="hover:underline underline-offset-2 "
              href="/legal/privacy"
            >
              About
            </Link>
          </div>
        </div>
      </div>

      <span className="text-white self-center text-sm font-medium">
        © 2025 Schedify by{" "}
        <a
          href="https://github.com/ksamirdev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600 transition-colors duration-300"
        >
          Samir
        </a>
        . All rights reserved.
      </span>

      <Image
        src="/schedify-text-mask.svg"
        alt=""
        height={500}
        width={300}
        className="w-[80%] absolute left-1/2 -translate-x-1/2 bottom-[-30%] "
      />
    </footer>
  );
};
