import {
  text,
  bigint,
  boolean,
  pgTable,
  varchar,
  json,
  integer,
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
  secret: text("secret"),
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
export type Webhook = typeof webhookTable.$inferSelect;

export const webhookEventTable = pgTable("webhook_events", {
  id: varchar("id", { length: 50 }).primaryKey(),
  isTest: boolean("is_test").default(false),
  event: varchar("event", { length: 50 }).notNull(),
  status: varchar("status", {
    length: 50,
    enum: ["COMPLETED", "ERROR", "PENDING", "CANCELED"],
  }).notNull(),
  payload: json("payload"),
  createdAt: bigint("created_at", { mode: "number" }).$defaultFn(() =>
    Date.now()
  ),
  updatedAt: bigint("updated_at", { mode: "number" }).$defaultFn(() =>
    Date.now()
  ),
  scheduledFor: bigint("scheduled_for", { mode: "number" }),
  processedAt: bigint("processed_at", { mode: "number" }),
  errorMessage: varchar("error_message", { length: 255 }),
  retryCount: integer("retry_count").default(0),
  webhookId: varchar("webhook_id", { length: 50 })
    .references(() => webhookTable.id)
    .notNull(),
  appId: varchar("app_id", { length: 50 })
    .references(() => appTable.id)
    .notNull(),
});

export const retriesTable = pgTable("retries", {
  id: varchar("id", { length: 50 }).primaryKey(),
  retryAt: bigint("retry_at", { mode: "number" }).notNull(),
  retryMethod: varchar("retry_method", {
    length: 50,
    enum: ["MANUAL", "AUTOMATIC"],
  }).notNull(),
  retryStatus: varchar("retry_status", {
    length: 50,
    enum: ["SUCCESS", "FAILURE"],
  }).notNull(),
  errorMessage: varchar("error_message", { length: 255 }),
  createdAt: bigint("created_at", { mode: "number" }).$defaultFn(() =>
    Date.now()
  ),
  webhookEventId: varchar("webhook_event_id", { length: 50 })
    .references(() => webhookEventTable.id)
    .notNull(),
});
