import { redirect } from 'next/navigation';

import { getSession } from '@/lib/auth/utils';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
	const session = await getSession();
	if (session) redirect('/app/dashboard');

	return (
		<div className='flex h-screen items-stretch justify-stretch md:items-center md:justify-center'>
			<div className='mx-auto w-full p-4 md:max-w-md md:p-0'>{children}</div>
		</div>
	);
}
