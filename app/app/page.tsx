// import { redirect } from 'next/navigation';

// import { api } from '@/lib/trpc/clients/server-invoker';

export default async function HomePage() {
	// const { selected, containsProject } = await api.dashboard.userProjects();

	// if (containsProject && selected.team.slug) {
	// 	redirect(`/~/${selected.team.slug}/${selected.project?.slug}`);
	// }

	return <div> You shouldn't see this page </div>;
}
