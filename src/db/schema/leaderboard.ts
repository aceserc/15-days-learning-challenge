
import { integer, pgTable, text, timestamp, date } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const leaderboard = pgTable("leaderboard", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  currentStreak: integer("current_streak").notNull().default(0),
  latestDay: integer("latest_day").notNull(),
  rank: integer("rank").notNull(),
  totalSubmissions: integer("total_submissions").notNull().default(0),
  techfestId: text("techfestId").notNull().default("global"),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
  date: date("date").notNull(), // <-- new column to store leaderboard snapshot date
});
