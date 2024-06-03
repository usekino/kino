import type { ProjectPageParams } from '../_lib/utils';

import { notFound } from 'next/navigation';

import { api } from '@/lib/trpc/clients/server-invoker';

import { List } from './_components/list';
import { ListSidebar } from './_components/sidebar';

export default async function FeedbackPage({ params }: ProjectPageParams) {
	const project = await api.project.findBySlug({
		slug: params.project,
	});
	if (!project) return notFound();

	return (
		<div className='container flex gap-6 py-6'>
			<div className='w-1/3'>
				<ListSidebar />
			</div>
			<div>
				<List />
			</div>
		</div>
	);
}
