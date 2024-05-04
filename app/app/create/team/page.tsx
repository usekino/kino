import { CreateTeamForm } from './_components/create-team-form';

export default async function CreateTeamPage() {
	return (
		<div>
			<div className='max-w-3xl'>
				<h1 className='scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl'>Create a team</h1>
				<div className='mt-6'>
					<CreateTeamForm />
				</div>
			</div>
		</div>
	);
}
