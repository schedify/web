"use client";

import { Button } from "@/components/ui/button";
import { LucideArrowUpRight, LucideLoader2 } from "lucide-react";
import { useState } from "react";

export const UpgradeButton = ({ accessToken }: { accessToken: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgradeClick = async () => {
    alert("Not yet operational");

    // setIsLoading(true);

    const resp = await fetch(`http://localhost:8080/v1/upgrade?plan=STARTER`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const res = await resp.json();
    if (!res.status) {
      setIsLoading(false);
      return alert(res.message);
    }

    window.location.href = res.url;
  };

  return (
    <Button
      onClick={handleUpgradeClick}
      variant="outline"
      className="border-2 self-center border-blue-500 focus-visible:ring-blue-500"
      size="lg"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          Redirect to payment screen <LucideLoader2 className="animate-spin" />
        </>
      ) : (
        <>
          Upgrade <LucideArrowUpRight />
        </>
      )}
    </Button>
  );
};
