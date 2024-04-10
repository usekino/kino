CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(255) PRIMARY KEY DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
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
	"roles" json DEFAULT '["member"]' NOT NULL,
	"latest_terms" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"TEMPORARY_hashed_password" varchar(255) NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "username_unique" UNIQUE("username"),
	CONSTRAINT "email_unique" UNIQUE("email")
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
	CONSTRAINT "github_id_unique" UNIQUE("github_id"),
	CONSTRAINT "google_id_unique" UNIQUE("google_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "sessions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "users" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_username_idx" ON "users" ("username");