CREATE TABLE "leaderboard" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"current_streak" integer DEFAULT 0 NOT NULL,
	"latest_day" integer NOT NULL,
	"rank" integer NOT NULL,
	"total_submissions" integer DEFAULT 0 NOT NULL,
	"techfestId" text DEFAULT 'global' NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "leaderboard" ADD CONSTRAINT "leaderboard_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;