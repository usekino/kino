import { env } from 'process';

import { notFound } from 'next/navigation';

import { api } from '@/lib/trpc/clients/server-invoker';

import type { ProjectLayoutParams } from './_lib/utils';

export default async function FrontProjectLayout({ params, children }: ProjectLayoutParams) {
	const project = await api.project.findBySlug({
		slug: params.project,
	});

	const domain = decodeURIComponent(params.domain);
	const subdomain = domain.includes(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) ? domain.split('.')[0] : '';

	if (!project || subdomain !== project.team?.slug) {
		return notFound();
	}

	return children;
}
