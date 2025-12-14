ALTER TABLE "user" ADD COLUMN "schoolName" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phoneNumber" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phoneNumberVerifiedAt" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "isOnboarded" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "leaderboard" ADD COLUMN "date" date NOT NULL;