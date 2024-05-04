import { api } from '@/lib/trpc/clients/server-invoker';

import { CreateProjectForm } from './_components/create-project-form';

export default async function CreateProjectPage() {
	const { teams } = await api.dashboard.available();
	return (
		<div>
			<div className='max-w-3xl'>
				<h1 className='scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl'>
					Create a project
				</h1>
				<div className='mt-6'>
					<CreateProjectForm teams={teams} />
				</div>
			</div>
		</div>
	);
}
