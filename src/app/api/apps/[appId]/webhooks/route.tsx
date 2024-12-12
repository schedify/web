import { db } from "@/db/drizzle";
import { appTable, webhookTable } from "@/db/schema";
import { cuid } from "@/lib/crypto";
import { createClerkClient, currentUser } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import crypto from "node:crypto";

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

  const destination = body.destination;
  if (!destination) {
    return NextResponse.json(
      {
        status: 0,
        message: "Missing required fields",
      },
      { status: 400 }
    );
  }

  const user = await currentUser();
  if (!user) {
    return NextResponse.json(
      {
        status: 0,
        message: "Unauthorized access",
      },
      { status: 401 }
    );
  }

  const p = await params;
  const appId = p.appId;

  const webhookId = `we_${cuid()}`;

  const n = Date.now();
  try {
    await db.insert(webhookTable).values({
      appId,
      id: webhookId,
      enabled: true,
      url: destination,
      secret: `wh_${crypto.randomBytes(32).toString("hex")}`,
      createdAt: n,
      updatedAt: n,
    });
  } catch (e) {
    return NextResponse.json(
      {
        status: 0,
        message: "Failed to create webhook",
        debug: String(e),
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      status: 1,
      message: "Webhook created",
      appId,
    },
    { status: 200 }
  );
}

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: Promise<{ [key: string]: string }>;
  }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        {
          status: 0,
          message: "Unauthorized access",
        },
        { status: 401 }
      );
    }

    const p = await params;
    const appId = p.appId;

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

    return NextResponse.json({
      status: 1,
      data: webhooks,
    });
  } catch (e) {
    return NextResponse.json(
      {
        status: 0,
        message: "Internal Server Error",
        debug: String(e),
      },
      { status: 500 }
    );
  }
}
