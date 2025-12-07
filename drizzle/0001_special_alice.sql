CREATE TABLE "participant" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"domain" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "participant" ADD CONSTRAINT "participant_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;