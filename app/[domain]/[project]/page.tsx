import { notFound } from 'next/navigation';

import { getProjectData } from '@/lib/db/prepared';

export default async function ProjectPage({ params }: { params: { project: string } }) {
	const project = await getProjectData(params.project);
	if (!project) return notFound();

	return (
		<div className='container py-6'>
			<h1>Project Page for {project.name}</h1>
			<p>{project.description}</p>
		</div>
	);
}
