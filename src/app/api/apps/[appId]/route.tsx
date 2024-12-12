import { db } from "@/db/drizzle";
import { appTable, webhookTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ [key: string]: string }> }
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
    const appId = p.appid;

    const [app] = await db
      .select({
        name: appTable.name,
        createdAt: appTable.createdAt,
        updatedAt: appTable.updatedAt,
      })
      .from(appTable)
      .where(and(eq(appTable.id, appId), eq(appTable.userId, user.id)))
      .limit(1);
    if (!app) {
      return NextResponse.json(
        {
          status: 0,
          message: "App not found",
        },
        { status: 404 }
      );
    }

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
      data: { app, webhooks },
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
