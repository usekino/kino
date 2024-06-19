import { notFound } from 'next/navigation';

import { api } from '@/lib/trpc/clients/server-invoker';

import { ProjectLayoutParams } from '../_lib/utils';
import { ListSidebar } from './_components/sidebar';

export default async function FeedbackPageLayout({ children, params }: ProjectLayoutParams) {
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
			<div>{children}</div>
		</div>
	);
}
