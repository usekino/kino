import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getUser } from '@/lib/auth/utils';

export default async function AuthedPage() {
	const user = await getUser();

	if (!user) {
		return notFound();
	}
	return (
		<main className='flex h-screen w-full flex-col items-center justify-center gap-2'>
			<h1 className='text-6xl font-bold'>Authed</h1>
			<p className='text-lg opacity-50'>You are now authenticated</p>
			<p className='text-lg opacity-50'>username: {user.username}</p>
			<p className='text-lg opacity-50'>email: {user.email}</p>
			{/* sign out */}
			<Link
				href='/sign-out'
				className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'
			>
				Sign out
			</Link>
		</main>
	);
}
