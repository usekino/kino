import type { LayoutProps } from './_types';

import { notFound } from 'next/navigation';

import { api } from '@/lib/trpc/clients/server-invoker';

import { ProjectHeader } from './_components/project-header';

export default async function DashboardPageLayout({ children, params }: LayoutProps) {
	const project = await api.project.findBySlug({
		slug: (await params).project,
	});
	if (!project) return notFound();

	return (
		<div>
			<ProjectHeader project={project} />
			<div>{children}</div>
		</div>
	);
}
