"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

const TABS = [
  {
    id: "1",
    label: "Overview",
    links: ["/"],
  },
  {
    id: "2",
    label: "Activities",
    links: ["/activities"],
  },
  {
    id: "3",
    label: "Configure",
    links: ["/configure"],
  },
];

export const DashboardNav = () => {
  const param = useParams();
  const pathname = usePathname();

  const activeTab = pathname.replace(/\/apps\/[^/]+/, "") || "/";

  return (
    <div className="flex flex-row items-center gap-5 px-5 text-sm font-[family-name:var(--font-geist-mono)] relative">
      {TABS.map((tab) => (
        <Link
          key={tab.id}
          className={`relative py-3 cursor-pointer ${
            tab.links.includes(activeTab)
              ? "text-black dark:text-gray-100 font-bold"
              : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-gray-100"
          }`}
          href={`/apps/${param.appId}${tab.links[0]}`}
        >
          {tab.label}
          {/* Animated border */}
          <span
            className={`absolute left-0 right-0 top-[-1px] h-0.5 bg-black dark:bg-white transition-all duration-300 ${
              tab.links.includes(activeTab) ? "scale-x-100" : "scale-x-0"
            }`}
            style={{ transformOrigin: "center" }}
          />
        </Link>
      ))}
    </div>
  );
};
