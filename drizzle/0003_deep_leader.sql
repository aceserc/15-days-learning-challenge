CREATE TABLE "submission" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"day" integer NOT NULL,
	"link" text NOT NULL,
	"summary" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"techfestId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "submission" ADD CONSTRAINT "submission_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;