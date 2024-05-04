ALTER TABLE "x_users_teams" ALTER COLUMN "user_role" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "x_users_teams" ALTER COLUMN "user_role" SET DEFAULT '["member"]'::jsonb;--> statement-breakpoint
ALTER TABLE "x_users_projects" ALTER COLUMN "user_role" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "x_users_projects" ALTER COLUMN "user_role" SET DEFAULT '["member"]'::jsonb;