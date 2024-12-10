import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: {
    user: process.env.DB_USERNAME,
    database: process.env.DATABASE,
    host: process.env.DB_HOSTNAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.CA_CERT,
    },
    url: "",
  },
});
