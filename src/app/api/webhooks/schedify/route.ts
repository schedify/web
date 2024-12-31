import { db } from "@/db/drizzle";
import { webhookEventTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import crypto from "node:crypto";

export async function POST(req: Request) {
  const payload = await req.json();
  const headerPayload = await headers();
  const signature = headerPayload.get("X-Schedify-Signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  const isValidSignature = verifySignature(signature, payload);
  if (!isValidSignature) {
    return new Response("Invalid signature", { status: 401 });
  }

  switch (payload.eventName) {
    case "task:completed": {
      await db
        .update(webhookEventTable)
        .set({
          status: "COMPLETED",
          processedAt: Date.now(),
        })
        .where(eq(webhookEventTable.id, payload.eventId));
      break;
    }

    case "task:failed": {
      await db
        .update(webhookEventTable)
        .set({
          status: "ERROR",
          processedAt: Date.now(),
          errorMessage: payload.errorMessage,
        })
        .where(eq(webhookEventTable.id, payload.eventId));
      break;
    }

    default:
      console.log("Unknown event:", payload.eventName);
  }

  return new Response("Webhook received", { status: 200 });
}

function verifySignature(signature: string, payload: any): boolean {
  const secret = process.env.SCHEDIFY_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("SCHEDIFY_WEBHOOK_SECRET is not defined");
  }
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(JSON.stringify(payload));
  const digest = hmac.digest("base64");
  return signature === digest;
}
