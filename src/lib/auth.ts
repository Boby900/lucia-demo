import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
// import { db } from "./db";
import pg from "pg";

import { cookies } from "next/headers";
import { cache } from "react";
import { drizzle } from "drizzle-orm/node-postgres";
import { text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
    id: text("id").primaryKey(),
  });

export const sessionTable = pgTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  });
  


export interface DatabaseUser {
  id: string;
  username: string;
  github_id: number;
}
const pool = new pg.Pool();
const db = drizzle(pool);



const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
});



export const getUser = cache(async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) return null;
	const { user, session } = await lucia.validateSession(sessionId);
	try {
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
	} catch {
		// Next.js throws error when attempting to set cookies when rendering page
	}
	return user;
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, "id">;
  }
}
