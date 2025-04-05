import { cn } from "@/lib/utils";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-primary min-h-[400px] relative flex py-10 overflow-hidden">
      <span
        className={cn(
          "absolute -bottom-20 left-0 right-0 font-bold select-none font-poppins text-center",
          "text-center text-5xl md:text-9xl lg:text-[12rem] xl:text-[13rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-primary dark:from-neutral-950 to-background dark:to-neutral-800 inset-x-0",
        )}
      >
        Schedify
      </span>

      <div className="container h-full">
        <div className="text-background flex flex-row justify-between">
          <div className="flex flex-row items-center gap-2">
            <img src="/schedify.png" alt="Schedify" height={24} width={24} />
            <h1 className="font-bold font-geist-mono text-lg">Schedify</h1>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-gray-300 font-geist-sans">Legal</h1>

            <div className="text-sm flex flex-col font-geist-sans gap-1">
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
        </div>

        <span className="text-white mt-auto text-sm font-medium font-geist-mono">
          Crafted with <span className="text-red-500">❤️</span> by{" "}
          <a
            href="https://github.com/ksamirdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600 transition-colors duration-300"
          >
            Samir
          </a>
          !
        </span>
      </div>
    </footer>
  );
};
