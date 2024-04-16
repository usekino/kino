import { CreateTeamForm } from './_components/create-team-form';

export default async function CreateTeamPage() {
	return (
		<div>
			<div className='mx-auto max-w-3xl'>
				<h1 className='scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl'>Create a team</h1>
				<CreateTeamForm />
			</div>
		</div>
	);
}
