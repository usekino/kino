import type { ProjectLayoutParams } from './_lib/utils';

import { notFound } from 'next/navigation';

import { api } from '@/lib/trpc/clients/server-invoker';

export default async function ProjectPageLayout({ params, children }: ProjectLayoutParams) {
	const project = await api.project.findBySlug({
		slug: params.project,
	});

	if (!project) {
		return notFound();
	}
	return children;
}
