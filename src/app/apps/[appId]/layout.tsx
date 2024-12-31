import DashboardNav from "@/app/components/DashboardNav";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Automate Your System. Schedule Them with Ease.",
  description:
    "Effortlessly schedule and send webhooks at the perfect time—secure, reliable, and automated.",
  icons: [
    {
      url: "/favicon.svg",
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
