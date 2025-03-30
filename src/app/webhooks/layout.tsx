import DashboardNav from "@/app/components/DashboardNav";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Scheduling made easier.",
  description: "The scheduling system your apps can depend on",
  icons: [
    {
      url: "/schedify.svg",
    },
  ],
};

export default function AppsTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardNav />
      {children}
    </>
  );
}
