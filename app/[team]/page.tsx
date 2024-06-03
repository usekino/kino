import type { TeamPageParams } from './_lib/server-utils';

import Link from 'next/link';

import { getUser } from '@/lib/auth/utils';

// import { env } from '@/lib/env/server';

import { getTeam, serverRoute } from './_lib/server-utils';

export default async function TeamPage({ params }: TeamPageParams) {
	const user = await getUser();

	const team = await getTeam({
		team: params.team,
		user,
	});

	const route = await serverRoute(team.slug);

	return (
		<div className='container py-6'>
			<h1>{team.name}</h1>
			<p>{team.description}</p>
			<div className='flex flex-col gap-4'>
				{team.projects.map((project) => (
					<div key={project.slug}>
						{/* View project */}
						<Link
							href={route(`/${project.slug}`)}
							className='text-primary underline-offset-4 hover:underline'
						>
							View project
						</Link>
						{/* Edit project */}
						<Link
							href={route(`/${project.slug}`, { console: true })}
							className='text-primary underline-offset-4 hover:underline'
						>
							Edit a project
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
