import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { getSession } from '@/lib/auth/utils';
import { env } from '@/lib/env/server';
import { api } from '@/lib/trpc/clients/server-invoker';

const signOut = async (request: NextRequest) => {
	console.log('>>>>>> sign out request');

	const session = await getSession();

	if (session) {
		await api.auth.signOut();
	}

	const url =
		process.env.NODE_ENV === 'development'
			? request.url.replace('localhost:3000', env.NEXT_PUBLIC_ROOT_DOMAIN)
			: request.url;

	return NextResponse.redirect(new URL('/', url));
};

export async function GET(request: NextRequest) {
	return await signOut(request);
}

export async function POST(request: NextRequest) {
	return await signOut(request);
}
