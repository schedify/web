import {
  text,
  bigint,
  boolean,
  pgTable,
  varchar,
  json,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: varchar("id", { length: 50 }).primaryKey(),
  username: text("username").default(""),
  firstName: text("first_name").default(""),
  lastName: text("last_name").default(""),
  banned: boolean("banned").default(false),
  emailAddress: text("email_address").default(""),
  createdAt: bigint("created_at", { mode: "number" }),
  updatedAt: bigint("updated_at", { mode: "number" }),
});

export const appTable = pgTable("apps", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  createdAt: bigint("created_at", { mode: "number" }),
  updatedAt: bigint("updated_at", { mode: "number" }),
  userId: varchar("user_id", { length: 50 })
    .notNull()
    .references(() => userTable.id),
});
export type App = typeof appTable.$inferSelect;

export const webhookTable = pgTable("webhooks", {
  id: varchar("id", { length: 50 }).primaryKey(),
  url: text("url"),
  secret: text("secret"),
  enabled: boolean("enabled").default(true),
  createdAt: bigint("created_at", { mode: "number" }),
  updatedAt: bigint("updated_at", { mode: "number" }),
  appId: varchar("app_id", { length: 50 })
    .references(() => appTable.id)
    .notNull(),
});

export const webhookEventTable = pgTable("webhook_events", {
  id: varchar("id", { length: 50 }).primaryKey(),
  event: varchar("event", { length: 50 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  payload: json("payload"),
  createdAt: bigint("created_at", { mode: "number" }),
  webhookId: varchar("webhook_id", { length: 50 })
    .references(() => webhookTable.id)
    .notNull(),
});
