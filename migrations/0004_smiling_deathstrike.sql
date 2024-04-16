CREATE TABLE IF NOT EXISTS "x_users_teams" (
	"id" varchar(255) PRIMARY KEY DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"team_id" varchar(255) NOT NULL,
	CONSTRAINT "x_users_teams_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "slug" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_slug_unique" UNIQUE("slug");