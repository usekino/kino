import { checkAuth, getUser } from '@/lib/auth/utils';

import { UserSettingsForm } from './_components/user-settings-form';

export default async function Account() {
	await checkAuth();
	const user = await getUser();
	if (!user) return null;

	return (
		<main>
			<h1 className='my-4 text-2xl font-semibold'>Account</h1>
			<div className='space-y-4'>
				<UserSettingsForm user={user} />
				{/* <UserSettings session={session} /> */}
			</div>
		</main>
	);
}
