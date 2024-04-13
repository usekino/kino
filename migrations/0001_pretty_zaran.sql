ALTER TABLE "users" RENAME COLUMN "roles" TO "role";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "username_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "email_unique";--> statement-breakpoint
ALTER TABLE "authentications" DROP CONSTRAINT "github_id_unique";--> statement-breakpoint
ALTER TABLE "authentications" DROP CONSTRAINT "google_id_unique";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "TEMPORARY_hashed_password";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "authentications" ADD CONSTRAINT "authentications_github_id_unique" UNIQUE("github_id");--> statement-breakpoint
ALTER TABLE "authentications" ADD CONSTRAINT "authentications_google_id_unique" UNIQUE("google_id");