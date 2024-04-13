import { eq } from 'drizzle-orm';
import { createDate, TimeSpan } from 'oslo';
import { alphabet, generateRandomString } from 'oslo/crypto';

import { db } from '@/lib/db';
import { emailVerifications } from '@/lib/db/schema';

export const generateEmailVerificationCode = async (
	userId: string,
	email: string
): Promise<string> => {
	await db.delete(emailVerifications).where(eq(emailVerifications.userId, userId));

	const code = generateRandomString(8, alphabet('0-9'));

	await db.insert(emailVerifications).values({
		userId,
		email,
		code,
		expiresAt: createDate(new TimeSpan(15, 'm')), // 15 minutes
	});

	return code;
};
