import type { Refine } from 'drizzle-zod';
import type { z } from 'zod';

import { Column, DrizzleTypeError, Table, TableConfig } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

type InferSchema<T> = T extends z.ZodType ? z.infer<T> : never;

// Generic type for CRUDS operations
export type DBtoCRUD<T extends Record<string, z.ZodType>> = {
	[K in keyof T as Capitalize<K & string>]: InferSchema<T[K]>;
};

export const protectedColumns = {
	createdAt: true,
	updatedAt: true,
} as const;

export const insertSchema = <T extends Table<TableConfig<Column<any, object, object>>>>(
	table: T,
	refineSchema?: {
		[K in keyof Refine<T, 'insert'>]: K extends keyof T['_']['columns']
			? Refine<T, 'insert'>[K]
			: DrizzleTypeError<`Column '${K & string}' does not exist in table '${T['_']['name']}'`>;
	}
) => {
	return createInsertSchema(table, refineSchema).omit(protectedColumns);
};

export const createSchema = {
	read: createSelectSchema,
	insert: createInsertSchema,
};
