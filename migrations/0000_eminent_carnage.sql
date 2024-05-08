CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(255) DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"private_id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified_at" timestamp DEFAULT null,
	"avatar" varchar(255),
	"bio" varchar(3072),
	"name" varchar(255),
	"role" json DEFAULT '["member"]' NOT NULL,
	"latest_terms" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authentications" (
	"id" varchar(255) PRIMARY KEY DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"hashed_password" varchar(255),
	"github_id" varchar(255),
	"google_id" varchar(255),
	CONSTRAINT "authentications_id_unique" UNIQUE("id"),
	CONSTRAINT "authentications_github_id_unique" UNIQUE("github_id"),
	CONSTRAINT "authentications_google_id_unique" UNIQUE("google_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "sessions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email_verifications" (
	"id" varchar(255) PRIMARY KEY DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"code" varchar(255) NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"email" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	CONSTRAINT "email_verifications_id_unique" UNIQUE("id"),
	CONSTRAINT "email_verifications_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" varchar(255) PRIMARY KEY DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" varchar(3072),
	"owner_id" varchar(255) NOT NULL,
	CONSTRAINT "teams_id_unique" UNIQUE("id"),
	CONSTRAINT "teams_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" varchar(255) PRIMARY KEY DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" varchar(3072),
	"team_id" varchar(255) NOT NULL,
	"github_url" varchar(255),
	CONSTRAINT "projects_id_unique" UNIQUE("id"),
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"user_id" serial NOT NULL,
	"team_id" serial NOT NULL,
	"project_id" serial NOT NULL,
	"board_id" serial NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(3072) NOT NULL,
	"status" json DEFAULT '["pending"]' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback_votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"feedback_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"vote" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback_boards" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"project_id" serial NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(3072)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "x_users_teams" (
	"id" varchar(255) PRIMARY KEY DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"user_role" jsonb DEFAULT '["member"]'::jsonb NOT NULL,
	"team_id" varchar(255) NOT NULL,
	CONSTRAINT "x_users_teams_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "x_users_projects" (
	"id" varchar(255) PRIMARY KEY DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"user_role" jsonb DEFAULT '["member"]'::jsonb NOT NULL,
	"team_id" varchar(255) NOT NULL,
	CONSTRAINT "x_users_projects_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "users" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_username_idx" ON "users" ("username");