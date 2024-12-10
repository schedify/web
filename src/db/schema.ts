import { unique } from "drizzle-orm/mysql-core";
import {
  bigint,
  boolean,
  index,
  pgTable,
  text,
  varchar,
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
