import { redirect } from 'next/navigation';

import { getSession } from '@/lib/auth/utils';
import { api } from '@/lib/trpc/clients/server-invoker';

export default async function SignOutPage() {
	const session = await getSession();

	if (!session) {
		redirect('/sign-in');
	}

	async function signOut() {
		'use server';

		await api.auth.signOut();
	}

	return (
		<div>
			<h1>Would you like to sign out?</h1>
			<form action={signOut}>
				<button
					className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'
					type='submit'
				>
					Sign out
				</button>
			</form>
		</div>
	);
}
