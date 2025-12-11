CREATE TYPE "public"."vote_type" AS ENUM('up', 'down');--> statement-breakpoint
CREATE TABLE "votes" (
	"userId" text NOT NULL,
	"submissionId" text NOT NULL,
	"type" "vote_type" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "votes_userId_submissionId_pk" PRIMARY KEY("userId","submissionId")
);
--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_submissionId_submission_id_fk" FOREIGN KEY ("submissionId") REFERENCES "public"."submission"("id") ON DELETE cascade ON UPDATE no action;