import type { ProjectPageParams } from '../_lib/utils';

import { Rss } from 'lucide-react';
import { notFound } from 'next/navigation';

import { api } from '@/lib/trpc/clients/server-invoker';

import { ProjectWrapper } from '../_components/project-wrapper';

export default async function FeedbackPage({ params }: ProjectPageParams) {
	const project = await api.project.findBySlug({
		slug: params.project,
	});
	if (!project) return notFound();

	return (
		<ProjectWrapper project={project} title='Updates' icon={Rss}>
			<div className='container flex gap-6 py-6'>Hey updates.</div>
		</ProjectWrapper>
	);
}
