import { MessageSquare } from 'lucide-react';
import { notFound } from 'next/navigation';

import { api } from '@/lib/trpc/clients/server-invoker';

import { ProjectHeader } from '../_components/project-header';
import { ProjectLayoutParams } from '../_lib/utils';

export default async function FeedbackLayout({ children, params }: ProjectLayoutParams) {
	const project = await api.project.findBySlug({
		slug: params.project,
	});
	if (!project) return notFound();

	return (
		<div>
			<ProjectHeader project={project} title='Feedback' icon={MessageSquare} />
			<>{children}</>
		</div>
	);
}
