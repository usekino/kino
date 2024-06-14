import { List } from 'lucide-react';
import { notFound } from 'next/navigation';

import { api } from '@/lib/trpc/clients/server-invoker';

import { ListSidebar } from '../_components/sidebar';
import { ProjectPageParams } from '../../_lib/utils';

export default async function FeedbackPageBugs({ params }: ProjectPageParams) {
	const project = await api.project.findBySlug({
		slug: params.project,
	});
	if (!project) return notFound();

	return (
		<div className='container flex gap-6 py-6'>
			<div className='w-1/4'>
				<div className='sticky top-12'>
					<ListSidebar teamSlug={project.team.slug} projectSlug={project.slug} />
				</div>
			</div>
			<div>
				<List />
			</div>
		</div>
	);
}
