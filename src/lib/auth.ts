import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { dbConnection } from "#/dal/db/client"; // your drizzle instance
import { tanstackStartCookies } from "better-auth/tanstack-start";

const db = dbConnection();

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    emailAndPassword: { 
        enabled: true, 
    },
    plugins: [tanstackStartCookies()]
});