CREATE TABLE IF NOT EXISTS "email_verifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(255) NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"email" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	CONSTRAINT "email_verifications_user_id_unique" UNIQUE("user_id")
);
