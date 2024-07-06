import { text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
    id: text("id").primaryKey(),
    username: text("username").notNull(),
    password_hash: text("password_hash").notNull(),  
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
