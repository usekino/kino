import type { ProjectLayoutParams } from './_lib/utils';

import { notFound } from 'next/navigation';

import { api } from '@/lib/trpc/clients/server-invoker';

import { ProjectHeader } from './_components/project-header';

export default async function DashboardPageLayout({ children, params }: ProjectLayoutParams) {
	const project = await api.project.findBySlug({
		slug: params.project,
	});
	if (!project) return notFound();

	return (
		<div>
			<ProjectHeader project={project} />
			<div>{children}</div>
		</div>
	);
}
