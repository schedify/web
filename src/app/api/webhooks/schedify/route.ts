import { db } from "@/db/drizzle";
import { webhookEventTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const payload = await req.json();

  const headerPayload = await headers();
  console.log("Signature:", headerPayload.get("X-Schedify-Signature"));
  console.log(payload);

  await db
    .update(webhookEventTable)
    .set({
      status: "COMPLETED",
    })
    .where(eq(webhookEventTable.id, payload.eventId));

  return new Response("Webhook received", { status: 200 });
}
