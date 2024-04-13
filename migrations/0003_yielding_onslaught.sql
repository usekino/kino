CREATE TABLE IF NOT EXISTS "teams" (
	"id" varchar(255) PRIMARY KEY DEFAULT LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0') NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"updates" integer DEFAULT 0 NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(3072),
	"owner_id" varchar(255) NOT NULL,
	"members" json NOT NULL,
	"github_url" varchar(255),
	CONSTRAINT "teams_id_unique" UNIQUE("id")
);
