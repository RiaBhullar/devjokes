import 'dotenv/config';
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema.ts";

export function dbConnection() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required.");
  }
  const neonClient = neon(databaseUrl);
  return drizzle(neonClient, { schema });
}

export type DbClient = ReturnType<typeof dbConnection>;
