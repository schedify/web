import DashboardNav from "@/app/components/DashboardNav";
import React from "react";

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
