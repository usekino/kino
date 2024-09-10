CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(255) NOT NULL,
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
	"latest_terms" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "sessions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authentications" (
	"auto_id" serial PRIMARY KEY NOT NULL,
	"id" varchar(255) DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
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
CREATE TABLE IF NOT EXISTS "email_verifications" (
	"auto_id" serial PRIMARY KEY NOT NULL,
	"id" varchar(255) DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"code" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	CONSTRAINT "email_verifications_id_unique" UNIQUE("id"),
	CONSTRAINT "email_verifications_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "email_verifications_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"auto_id" serial PRIMARY KEY NOT NULL,
	"id" varchar(255) DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
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
CREATE TABLE IF NOT EXISTS "team_members" (
	"auto_id" serial PRIMARY KEY NOT NULL,
	"id" varchar(255) DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"team_id" varchar(255) NOT NULL,
	"user_role" jsonb DEFAULT '["member"]' NOT NULL,
	CONSTRAINT "team_members_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"auto_id" serial PRIMARY KEY NOT NULL,
	"id" varchar(255) DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" varchar(3072),
	"team_id" varchar NOT NULL,
	"website_url" varchar(255),
	CONSTRAINT "projects_id_unique" UNIQUE("id"),
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_members" (
	"auto_id" serial PRIMARY KEY NOT NULL,
	"id" varchar(255) DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"project_id" varchar(255) NOT NULL,
	"user_role" varchar(255) DEFAULT 'member' NOT NULL,
	CONSTRAINT "project_members_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "boards" (
	"auto_id" serial PRIMARY KEY NOT NULL,
	"id" varchar(255) DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"project_id" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(3072),
	CONSTRAINT "boards_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback" (
	"auto_id" serial PRIMARY KEY NOT NULL,
	"id" varchar(255) DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"board_id" varchar(255) NOT NULL,
	"team_id" varchar(255) NOT NULL,
	"author_user_id" varchar(255) NOT NULL,
	"assigned_user_id" varchar(255),
	"title" varchar(255) NOT NULL,
	"description" varchar(3072) NOT NULL,
	"eta" timestamp,
	"status" jsonb DEFAULT '["review"]' NOT NULL,
	CONSTRAINT "feedback_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback_assignments" (
	"auto_id" serial PRIMARY KEY NOT NULL,
	"id" varchar(255) DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"feedback_id" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	CONSTRAINT "feedback_assignments_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback_votes" (
	"auto_id" serial PRIMARY KEY NOT NULL,
	"id" varchar(255) DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"feedback_id" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"vote" integer NOT NULL,
	CONSTRAINT "feedback_votes_id_unique" UNIQUE("id"),
	CONSTRAINT "unique_feedback_user" UNIQUE("feedback_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback_updates" (
	"auto_id" serial PRIMARY KEY NOT NULL,
	"id" varchar(255) DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"feedback_id" varchar(255) NOT NULL,
	"updater_user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"content" varchar(3072) NOT NULL,
	"visibility" varchar(255) NOT NULL,
	CONSTRAINT "feedback_updates_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback_comments" (
	"auto_id" serial PRIMARY KEY NOT NULL,
	"id" varchar(255) DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"feedback_id" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"status" jsonb DEFAULT '["open"]' NOT NULL,
	CONSTRAINT "feedback_comments_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback_comments_reactions" (
	"auto_id" serial PRIMARY KEY NOT NULL,
	"id" varchar(255) DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"feedback_comment_id" varchar(255) NOT NULL,
	"reactor_user_id" varchar(255) NOT NULL,
	"reaction" varchar(255) NOT NULL,
	CONSTRAINT "feedback_comments_reactions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback_comments_attachments" (
	"auto_id" serial PRIMARY KEY NOT NULL,
	"id" varchar(255) DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"feedback_comment_id" varchar(255) NOT NULL,
	"attachment_id" varchar(255) NOT NULL,
	CONSTRAINT "feedback_comments_attachments_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback_comments_history" (
	"auto_id" serial PRIMARY KEY NOT NULL,
	"id" varchar(255) DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"feedback_comment_id" varchar(255) NOT NULL,
	"content" varchar(3072) NOT NULL,
	CONSTRAINT "feedback_comments_history_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_members" ADD CONSTRAINT "team_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_members" ADD CONSTRAINT "team_members_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_members" ADD CONSTRAINT "project_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_members" ADD CONSTRAINT "project_members_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "users" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_username_idx" ON "users" USING btree ("username");