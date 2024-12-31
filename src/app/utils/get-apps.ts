import { db } from "@/db/drizzle";
import { appTable, webhookTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const fetchApps = cache(async (userId: string) => {
  const apps = await db
    .select({
      id: appTable.id,
      name: appTable.name,
      createdAt: appTable.createdAt,
      updatedAt: appTable.updatedAt,
    })
    .from(appTable)
    .where(eq(appTable.userId, userId));

  return apps;
});

export const fetchApp = cache(async (appId: string) => {
  const [app] = await db
    .select({
      id: appTable.id,
      name: appTable.name,
      createdAt: appTable.createdAt,
      updatedAt: appTable.updatedAt,
    })
    .from(appTable)
    .where(eq(appTable.id, appId));

  return app;
});

export const fetchAppWebhooks = cache(async (appId: string) => {
  const webhooks = await db
    .select({
      id: webhookTable.id,
      url: webhookTable.url,
      enabled: webhookTable.enabled,
      createdAt: webhookTable.createdAt,
      updatedAt: webhookTable.updatedAt,
    })
    .from(webhookTable)
    .where(eq(webhookTable.appId, appId));

  return webhooks;
});
