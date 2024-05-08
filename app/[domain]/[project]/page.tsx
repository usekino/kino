import { notFound } from 'next/navigation';

import { api } from '@/lib/trpc/clients/server-invoker';

export default async function ProjectPage({ params }: { params: { project: string } }) {
	const project = await api.project.findBySlug({
		slug: params.project,
	});

	if (!project) {
		return notFound();
	}

	return (
		<div className='container py-6'>
			<h1>Project Page for {project.name}</h1>
			<p>{project.description}</p>
		</div>
	);
}
