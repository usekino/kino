import { Heading } from '@/components/heading';

// import { api } from '@/lib/trpc/clients/server-invoker';

// import { CreateProjectForm } from './_components/create-project-form';

export default async function CreateProjectPage() {
	// const teams = await api.dashboard.userTeams();
	return (
		<div className='mx-auto mt-20 max-w-2xl'>
			<div className='mx-auto flex max-w-md flex-col items-center text-center'>
				<Heading tag='h1'>Create a project</Heading>
				<div>
					<p className='opacity-50'>Create a fresh project for your team.</p>
				</div>
			</div>
			<div className='mt-6'>
				{/* TODO: Re-add this when I replace userTeams with getUserProjects */}
				{/* <CreateProjectForm teams={teams} /> */}
			</div>
		</div>
	);
}
