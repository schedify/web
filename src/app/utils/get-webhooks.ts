import { db } from "@/db/drizzle";
import { webhookTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { cache } from "react";

export const fetchAppWebhook = cache(
  async (appId: string, webhookId: string) => {
    const webhooks = await db
      .select({
        id: webhookTable.id,
        url: webhookTable.url,
        enabled: webhookTable.enabled,
        secret: webhookTable.secret,
        createdAt: webhookTable.createdAt,
        updatedAt: webhookTable.updatedAt,
      })
      .from(webhookTable)
      .where(and(eq(webhookTable.appId, appId), eq(webhookTable.id, webhookId)))
      .limit(1);

    return webhooks.at(0) ?? null;
  }
);
