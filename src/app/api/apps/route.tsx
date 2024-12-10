import { db } from "@/db/drizzle";
import { appTable } from "@/db/schema";
import { cuid } from "@/lib/crypto";
import { createClerkClient, currentUser } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function POST(req: Request) {
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

  const name = body.name;

  if (!name) {
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

  const count = await db
    .select({ count: sql`count(*)`.mapWith(Number) })
    .from(appTable)
    .where(eq(appTable.userId, user.id));

  if ((count.at(0)?.count ?? 0) > 2) {
    return NextResponse.json(
      {
        status: 0,
        message: "You have reached the maximum number of apps",
      },
      {
        status: 400,
      }
    );
  }

  const appId = `app_${cuid()}`;
  let app = {
    id: appId,
    name: name,
    userId: user.id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  try {
    await db.insert(appTable).values(app);
  } catch (e) {
    return NextResponse.json(
      {
        status: 0,
        message: "Failed to create app",
        debug: String(e),
      },
      { status: 500 }
    );
  }

  await clerkClient.users.updateUserMetadata(user.id, {
    publicMetadata: {
      apps: [...((user.publicMetadata?.apps ?? []) as (typeof app)[]), app],
    },
  });

  return NextResponse.json(
    {
      status: 1,
      message: "App created",
      appId,
    },
    { status: 200 }
  );
}
