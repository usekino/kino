import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { getUser } from '@/lib/auth/utils';
import { db } from '@/lib/db/index';
import { users } from '@/lib/db/schema/users';

export async function PUT(request: Request) {
	const user = await getUser();
	if (!user) return new Response('Error', { status: 400 });
	const body = (await request.json()) as { name?: string; email?: string };

	await db
		.update(users)
		.set({ ...body })
		.where(eq(users.id, user.id));
	revalidatePath('/account');
	return new Response(JSON.stringify({ message: 'ok' }), { status: 200 });
}
