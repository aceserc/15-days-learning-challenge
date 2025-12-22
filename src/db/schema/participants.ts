import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const participants = pgTable("participant", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  domain: text("domain").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  startedAt: timestamp("startedAt"),
  techfestId: text("techfestId").notNull(),
});

export type Participant = typeof participants.$inferSelect;
