import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const db = drizzle({
  client: new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOSTNAME,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.CA_CERT,
    },
  }),
});
