import { Heading } from '@/components/heading';

// import { CreateTeamForm } from './_components/create-team-form';

export default async function CreateTeamPage() {
	return (
		<div className='container mt-20'>
			<div className='mx-auto flex max-w-md flex-col items-center text-center'>
				<Heading tag='h1'>Create a team</Heading>
				<div>
					<p className='opacity-50'>Create your team and invite your team members to join.</p>
				</div>
			</div>
			<div className='mt-6'>{/* <CreateTeamForm /> */}</div>
		</div>
	);
}
