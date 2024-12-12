import { db } from "@/db/drizzle";
import { webhookEventTable, webhookTable } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
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

export const fetchWebhookLogs = cache(
  async (webhookId: string, status: string) => {
    const logs = await db
      .select({
        id: webhookEventTable.id,
        event: webhookEventTable.event,
        status: webhookEventTable.status,
        payload: webhookEventTable.payload,
        createdAt: webhookEventTable.createdAt,
        updatedAt: webhookEventTable.updatedAt,
        processedAt: webhookEventTable.processedAt,
        errorMessage: webhookEventTable.errorMessage,
        retryCount: webhookEventTable.retryCount,
      })
      .from(webhookEventTable)
      .where(eq(webhookEventTable.webhookId, webhookId))
      .orderBy(desc(webhookEventTable.updatedAt))
      .limit(10);

    if (status !== "all") {
      return logs.filter((log) => log.status === status);
    }

    return logs;
  }
);

export const fetchWebhookEventPayload = cache(
  async (webhookId: string, eventId: string) => {
    const logs = await db
      .select({
        // id: webhookEventTable.id,
        // event: webhookEventTable.event,
        // status: webhookEventTable.status,
        payload: webhookEventTable.payload,
        // createdAt: webhookEventTable.createdAt,
        // updatedAt: webhookEventTable.updatedAt,
        // processedAt: webhookEventTable.processedAt,
        // errorMessage: webhookEventTable.errorMessage,
        // retryCount: webhookEventTable.retryCount,
      })
      .from(webhookEventTable)
      .where(
        and(
          eq(webhookEventTable.webhookId, webhookId),
          eq(webhookEventTable.id, eventId)
        )
      )
      .limit(1);

    return logs.at(0) ?? null;
  }
);
