import { db } from "@/db/drizzle";
import { webhookEventTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { cache } from "react";

export const fetchStats = cache(async (appId: string) => {
  const events = await db
    .select()
    .from(webhookEventTable)
    .orderBy(desc(webhookEventTable.updatedAt))
    .where(eq(webhookEventTable.appId, appId));

  const total = events.length;
  const pending = events.reduce((acc, event) => {
    if (event.status !== "PENDING") return acc;
    return acc + 1;
  }, 0);

  const error = events.reduce((acc, event) => {
    if (event.status !== "ERROR") return acc;
    return acc + 1;
  }, 0);

  return {
    total,
    pending,
    error,
    retry: 0,
    events: events.slice(0, 5),
  };
});
