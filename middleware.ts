import * as context from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/lib/env/client';

import { lucia } from './lib/auth/lucia';

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api routes
		 * 2. /_next (Next.js internals)
		 * 3. /_static (inside /public)
		 * 4. all root files inside /public (e.g. /favicon.ico)
		 */
		'/((?!api/|_next/|_static/|_vercel|favicon.ico|[\\w-]+\\.\\w+).*)',
	],
};

const uncachedValidateAuthRequest = async () => {
	const sessionId = context.cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		return {
			user: null,
			session: null,
		};
	}
	const result = await lucia.validateSession(sessionId);
	try {
		if (result.session && result.session.fresh) {
			const sessionCookie = lucia.createSessionCookie(result.session.id);
			context.cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
		if (!result.session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			context.cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
	} catch {}
	return result;
};

export default async function middleware(req: NextRequest) {
	const url = req.nextUrl;

	// Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
	const hostname = req.headers
		.get('host')!
		.replace('localhost:3000', `.${env.NEXT_PUBLIC_ROOT_DOMAIN}`);

	const subdomain = hostname.includes(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`)
		? hostname.split('.')[0]
		: '';

	const searchParams = req.nextUrl.searchParams.toString();
	// Get the pathname of the request (e.g. /, /about, /blog/first-post)
	const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

	// console.log('path', path);
	// console.log('hostname', hostname);
	// console.log('subdomain', subdomain);
	// console.log('nextUrl', req.nextUrl.host);

	// if (path.startsWith('/sign-out')) {
	// 	return NextResponse.redirect(new URL('/api/sign-out', req.url));
	// }

	if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
		const { session } = await uncachedValidateAuthRequest();
		if (!session && path !== '/sign-in') {
			return NextResponse.redirect(new URL('/sign-in', req.url));
		} else if (session && path == '/sign-in') {
			return NextResponse.redirect(new URL('/', req.url));
		}
		return NextResponse.rewrite(new URL(`/app${path === '/' ? '' : path}`, req.url));
	}

	if (
		path.startsWith('/sign-in') ||
		path.startsWith('/sign-up') ||
		path.startsWith('/sign-out') ||
		(path.startsWith('/') && !subdomain)
	) {
		if (!!subdomain) {
			return NextResponse.redirect(
				new URL(`https://${env.NEXT_PUBLIC_ROOT_DOMAIN}${path}`, req.url)
			);
		}
		return NextResponse.next();
	}

	// rewrite everything else to `/[domain]/[slug] dynamic route
	return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
