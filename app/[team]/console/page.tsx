import { redirect } from 'next/navigation';

import { getUser } from '@/lib/auth/utils';
import { env } from '@/lib/env/server';

// import { api } from '@/lib/trpc/clients/server-invoker';

export default async function ConsolePage() {
	// const user = await getUser();
	// if (!user) {
	// 	return redirect(`https://${params.team}.${env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-in`);
	// }

	// const { selected, containsProject } = await api.dashboard.userProjects();

	// if (!containsProject) {
	// 	redirect(`/create/project`);
	// }

	// if (containsProject && !!selected) {
	// 	redirect(`/p/${selected.project?.slug}`);
	// }

	// return notFound();

	return <div>Testing</div>;
}
