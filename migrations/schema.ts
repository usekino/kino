import { pgTable, unique, text, foreignKey, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const user = pgTable("user", {
	id: text("id").primaryKey().notNull(),
	email: text("email").notNull(),
	hashedPassword: text("hashed_password").notNull(),
	name: text("name"),
},
(table) => {
	return {
		userEmailUnique: unique("user_email_unique").on(table.email),
	}
});

export const session = pgTable("session", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => user.id),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
});