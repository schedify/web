import { db } from "@/db/drizzle";
import { webhookEventTable, webhookTable } from "@/db/schema";
import { cuid } from "@/lib/crypto";
import { sentToQueue } from "@/lib/rabbitmq";
import { validateScheduleBody } from "@/lib/zod";
import { and, eq } from "drizzle-orm";
import moment from "moment";
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

  const [webhook] = await db
    .select()
    .from(webhookTable)
    .where(
      and(eq(webhookTable.appId, appId), eq(webhookTable.id, body.destination))
    )
    .limit(1);

  if (!webhook) {
    return NextResponse.json(
      {
        status: 0,
        message: "Destination webhook not found",
      },
      { status: 404 }
    );
  }

  const eventId = `ev_${cuid()}`;
  const payload = JSON.parse(body.payload);

  await db.insert(webhookEventTable).values({
    id: eventId,
    event: body.event,
    status: "PENDING",
    webhookId: body.destination,
    payload,
    scheduledFor: body.scheduledFor.valueOf(),
    appId: appId,
  });

  await sentToQueue({
    webhookURL: webhook.url,
    webhookSecret: webhook.secret,
    delay: moment(body.scheduledFor).diff(moment(), "seconds"),
    payload,
  });

  return NextResponse.json({
    status: 1,
    message: "Created webhook event!",
    appId: appId,
    eventId: eventId,
  });
}
