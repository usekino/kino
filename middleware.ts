import type { NextRequest } from 'next/server';

// import { arrayContains, sql } from 'drizzle-orm';
// import * as context from 'next/headers';
import { NextResponse } from 'next/server';

// import { env } from '@/lib/env/client';

// import { lucia } from './lib/auth/lucia';
// import { db } from './lib/db';
// import { readProjectSchema } from './lib/schema/project.schema';
// import { readTeamSchema } from './lib/schema/team.schema';
// import { getTeamProjectSelect } from './lib/trpc/routers/lib/selectedTeamProject';
// import { createTruthyObject } from './lib/utils';
import { getValidSubdomain } from './lib/utils/get-valid-subdomain';

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

// const uncachedValidateAuthRequest = async () => {
// 	const sessionId = context.cookies().get(lucia.sessionCookieName)?.value ?? null;
// 	if (!sessionId) {
// 		return {
// 			user: null,
// 			session: null,
// 		};
// 	}
// 	const result = await lucia.validateSession(sessionId);
// 	try {
// 		if (result.session && result.session.fresh) {
// 			const sessionCookie = lucia.createSessionCookie(result.session.id);
// 			context.cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
// 		}
// 		if (!result.session) {
// 			const sessionCookie = lucia.createBlankSessionCookie();
// 			context.cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
// 		}
// 	} catch {}
// 	return result;
// };

// const uncachedGetUserProjectsByUserId = db.query.xUsersTeams
// 	.findMany({
// 		columns: {},
// 		where: (table, { eq, and, or, not }) => {
// 			return and(
// 				eq(table.userId, sql.placeholder('userId')),
// 				or(
// 					arrayContains(table.userRole, ['admin']),
// 					arrayContains(table.userRole, ['member']) //
// 				),
// 				not(arrayContains(table.userRole, ['blocked']))
// 			);
// 		},
// 		with: {
// 			team: {
// 				columns: createTruthyObject(readTeamSchema.shape),
// 				with: {
// 					projects: {
// 						columns: createTruthyObject(readProjectSchema.shape),
// 					},
// 				},
// 			},
// 		},
// 	})
// 	.prepare('P_ProjectsByTeam');

const urlData = (req: NextRequest) => {
	const url = req.nextUrl;

	let host = req.headers.get('host')!;

	// special case for Vercel preview deployment URLs
	if (
		host.includes('---') &&
		host.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
	) {
		host = `${host.split('---')[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
	}

	const searchParams = url.searchParams.toString();
	const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;
	const subdomain = getValidSubdomain(host);

	return {
		host,
		path,
		searchParams,
		subdomain,
	};
};

export default async function middleware(req: NextRequest) {
	const { host, subdomain, path } = urlData(req);

	console.log('MIDDLEWARE >>>>>>', { host, subdomain, path });

	// rewrite root application to `/home` folder
	// if (host === 'localhost:3000' || host === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
	// 	return NextResponse.rewrite(new URL(`/home${path === '/' ? '' : path}`, req.url));
	// }

	if (!!subdomain) {
		if (subdomain === 'console') {
			return NextResponse.rewrite(new URL(`/console${path === '/' ? '' : path}`, req.url));
		} else {
			return NextResponse.rewrite(new URL(`/${host}${path}`, req.url));
		}
	}

	// const url = req.nextUrl;

	// Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
	// const hostname = req.headers
	// 	.get('host')!
	// 	.replace('localhost:3000', `.${env.NEXT_PUBLIC_ROOT_DOMAIN}`);

	// const subdomain = host.includes(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) ? host.split('.')[0] : '';
	// const searchParams = req.nextUrl.searchParams.toString();
	// Get the pathname of the request (e.g. /, /about, /blog/first-post)
	// const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

	// If request is inside dashboard
	// if (hostname == `console.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
	// 	const { session } = await uncachedValidateAuthRequest();

	// 	if (!session && path !== '/sign-in') {
	// 		return NextResponse.redirect(
	// 			new URL(`https://${env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-in`, req.url)
	// 		);
	// 	}

	// 	// Check if the user has a project, and if not, redirect to the create project page
	// 	if (path === '/' && session) {
	// 		const userProjects = await uncachedGetUserProjectsByUserId.execute({
	// 			userId: session.userId,
	// 		});
	// 		const containsProject = !!userProjects
	// 			.map((up) => up.team)
	// 			.find((team) => team.projects.length > 0);
	// 		if (!containsProject) {
	// 			return NextResponse.redirect(new URL('/create/project', req.url));
	// 		} else {
	// 			const selected = await getTeamProjectSelect(user.id);

	// 			return NextResponse.redirect(
	// 				new URL(`/~/${selected.team.slug}/${selected.project?.slug}`, req.url)
	// 			);
	// 		}
	// 	}

	// 	return NextResponse.rewrite(new URL(`/app${path === '/' ? '' : path}`, req.url));
	// }

	// if (
	// 	path.startsWith('/sign-in') ||
	// 	path.startsWith('/sign-up') ||
	// 	path.startsWith('/sign-out') ||
	// 	(path.startsWith('/') && !subdomain)
	// ) {
	// 	if (!!subdomain) {
	// 		return NextResponse.redirect(
	// 			new URL(`https://${env.NEXT_PUBLIC_ROOT_DOMAIN}${path}`, req.url)
	// 		);
	// 	}
	// 	return NextResponse.next();
	// }

	// rewrite everything else to `/[domain]/[slug] dynamic route
	// return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));

	return NextResponse.next();
}
