import { checkAuth } from '@/lib/auth/utils';

// import UserSettings from './UserSettings';
import { UserSettingsForm } from './_components/user-settings-form';

export default async function Account() {
	await checkAuth();
	// const session = await getSession();

	return (
		<main>
			<h1 className='my-4 text-2xl font-semibold'>Account</h1>
			<div className='space-y-4'>
				<UserSettingsForm />
				{/* <UserSettings session={session} /> */}
			</div>
		</main>
	);
}
