"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  {
    id: "1",
    label: "Overview",
    links: ["/webhooks/", new RegExp("/webhooks/[a-zA-Z0-9-]+")],
  },
  {
    id: "4",
    label: "Settings",
    links: ["/settings"],
  },
] as const;

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-row items-center gap-5 px-5 container text-sm font-[family-name:var(--font-geist-mono)] relative">
      {TABS.map((tab) => {
        const isActive = tab.links.some((link) =>
          typeof link === "string" ? link === pathname : link.test(pathname)
        );

        return (
          <Link
            key={tab.id}
            className={`relative py-3 cursor-pointer ${
              isActive
                ? "text-black dark:text-gray-100 font-bold"
                : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-gray-100"
            }`}
            href={tab.links[0]}
          >
            {tab.label}
            {/* Animated border */}
            <span
              className={`absolute left-0 right-0 top-[-1px] h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                isActive ? "scale-x-100" : "scale-x-0"
              }`}
              style={{ transformOrigin: "center" }}
            />
          </Link>
        );
      })}
    </div>
  );
}
