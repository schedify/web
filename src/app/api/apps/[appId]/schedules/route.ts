import { db } from "@/db/drizzle";
import { webhookEventTable, webhookTable } from "@/db/schema";
import { cuid } from "@/lib/crypto";
import { validateScheduleBody } from "@/lib/zod";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
export async function POST(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ [key: string]: string }>;
  }
) {
  let body = null;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json(
      {
        status: 0,
        message: String(e),
      },
      { status: 400 }
    );
  }

  try {
    body = validateScheduleBody.parse(body);
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(
        {
          status: 0,
          message: e.issues.at(0)?.message ?? "Invalid request body",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: 0,
        message: String(e),
      },
      { status: 400 }
    );
  }

  const p = await params;
  const appId = p.appId;

  const webhooks = await db
    .select()
    .from(webhookTable)
    .where(
      and(eq(webhookTable.appId, appId), eq(webhookTable.id, body.destination))
    );

  if (webhooks.length === 0) {
    return NextResponse.json(
      {
        status: 0,
        message: "Destination webhook not found",
      },
      { status: 404 }
    );
  }

  const eventId = `ev_${cuid()}`;

  await db.insert(webhookEventTable).values({
    id: eventId,
    event: body.event,
    status: "PENDING",
    webhookId: body.destination,
    payload: JSON.parse(body.payload),
    scheduledFor: body.scheduledFor.valueOf(),
    appId: appId,
  });

  return NextResponse.json({
    status: 1,
    message: "Created webhook event!",
    appId: appId,
    eventId: eventId,
  });
}
