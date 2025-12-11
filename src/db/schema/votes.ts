import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./auth";
import { submissions } from "./submissions";

export const voteTypeEnum = pgEnum("vote_type", ["up", "down"]);

export const votes = pgTable(
  "votes",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    submissionId: text("submissionId")
      .notNull()
      .references(() => submissions.id, { onDelete: "cascade" }),
    type: voteTypeEnum("type").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.submissionId] }),
  }),
);
