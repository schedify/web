import { db } from "@/db/drizzle";
import { appTable, webhookTable } from "@/db/schema";
import { cuid } from "@/lib/crypto";
import { createClerkClient, currentUser } from "@clerk/nextjs/server";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import crypto from "node:crypto";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

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

  if (!user.publicMetadata.apps.some((app) => app.id === appId)) {
    return NextResponse.json(
      {
        status: 0,
        message: "Unauthorized access",
      },
      { status: 401 }
    );
  }

  const w = await db
    .select()
    .from(webhookTable)
    .where(
      and(eq(webhookTable.url, destination), eq(webhookTable.appId, appId))
    );

  if (w.length > 0) {
    return NextResponse.json(
      {
        status: 0,
        message: "Webhook already exists",
      },
      { status: 400 }
    );
  }

  const n = Date.now();

  const webhook = {
    appId,
    id: `we_${cuid()}`,
    enabled: true,
    url: destination,
    secret: `wh_${crypto.randomBytes(32).toString("hex")}`,
    createdAt: n,
    updatedAt: n,
  };

  try {
    await db.insert(webhookTable).values(webhook);
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

  try {
    const apps = user.publicMetadata.apps ?? [];

    const app = apps.find((a) => a.id === appId);
    if (app) {
      app.webhooks.unshift({
        id: webhook.id,
        url: webhook.url,
        enabled: webhook.enabled,
        createdAt: webhook.createdAt,
        updatedAt: webhook.updatedAt,
      });
    }

    await clerkClient.users.updateUserMetadata(user.id, {
      publicMetadata: {
        apps,
      },
    });
  } catch {}

  return NextResponse.json(
    {
      status: 1,
      message: "Webhook created",
      appId,
      webhookId: webhook.id,
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

    if (!user.publicMetadata.apps.some((app) => app.id === appId)) {
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
