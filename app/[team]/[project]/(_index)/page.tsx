// import Link from 'next/link';
import { notFound } from 'next/navigation';

import { api } from '@/lib/trpc/clients/server-invoker';

// import { serverRoute } from '../../_lib/server-utils';
import { ProjectDashboard } from './_components/project-dashboard';

export default async function ProjectPage({
	params,
}: {
	params: { team: string; project: string };
}) {
	const project = await api.project.findBySlug({
		slug: params.project,
	});

	// const route = await serverRoute({
	// 	teamSlug: params.team,
	// });

	if (!project) {
		return notFound();
	}

	return (
		<div className='container py-6'>
			{/* <h1>Project Page for {project.name}</h1>
			<p>{project.description}</p>
			<Link className='hocus:underline' href={route(`/`)}>
				← Back to team
			</Link> */}
			<ProjectDashboard />
		</div>
	);
}
