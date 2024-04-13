import { redirect } from 'next/navigation';

import { getSession } from '@/lib/auth/utils';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
	const session = await getSession();
	if (session) redirect('/app/dashboard');

	return <div className='h-screen bg-muted'>{children}</div>;
}
