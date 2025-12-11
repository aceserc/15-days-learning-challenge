import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const submissions = pgTable("submission", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  day: integer("day").notNull(),
  link: text("link").notNull(),
  summary: text("summary").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  techfestId: text("techfestId").notNull(),
});

export type Submission = typeof submissions.$inferSelect;
