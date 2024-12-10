import { db } from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: NextRequest) {
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!CLERK_WEBHOOK_SECRET) {
    throw new Error(
      "Error: Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env"
    );
  }

  const wh = new Webhook(CLERK_WEBHOOK_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const eventType = evt.type;
  console.log(`Received webhook event type of ${eventType}`);
  console.log("Webhook payload:", body);

  if (eventType === "user.created") {
    const {
      id,
      banned,
      username,
      last_name,
      first_name,
      created_at,
      updated_at,
      email_addresses,
      primary_email_address_id,
    } = evt.data;

    const email = email_addresses.find(
      (email) => email.id === primary_email_address_id
    );

    await db.insert(userTable).values({
      id,
      username,
      emailAddress: email?.email_address ?? "",
      firstName: first_name,
      lastName: last_name,
      banned,
      createdAt: created_at,
      updatedAt: updated_at,
    });
  }

  return new Response("Webhook received", { status: 200 });
}
