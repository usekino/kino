import { notFound, redirect } from 'next/navigation';

import { getUser } from '@/lib/auth/utils';
import { env } from '@/lib/env/server';
import { api } from '@/lib/trpc/clients/server-invoker';

export default async function HomePage() {
	const user = await getUser();
	if (!user) return redirect(`${env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-in`);

	const { selected, containsProject } = await api.dashboard.userProjects();

	if (!containsProject) {
		redirect(`/create/project`);
	}

	if (containsProject && !!selected) {
		redirect(`/~/${selected.team.slug}/${selected.project?.slug}`);
	}

	return notFound();
}
