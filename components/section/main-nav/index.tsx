import Link from 'next/link';

import { GlobalSearchToggle } from '@/components/global-search/toggle';
import { ModeToggle } from '@/components/ui/ThemeToggle';
import { getUser } from '@/lib/auth/utils';

import { UserNav } from './user-nav';

export const MainNav = async ({ dashboard }: { dashboard: boolean }) => {
	const user = await getUser();
	if (!user) return null;

	return (
		<div className='flex py-2'>
			<div className='container flex items-center justify-between'>
				<Link
					href={user ? '/app' : '/'}
					className='mr-6 font-bold tracking-widest hover:underline hover:decoration-2 hover:underline-offset-2'
				>
					KINO
				</Link>
				<div className='self-center'>
					<GlobalSearchToggle />
				</div>
				<div className='flex items-center space-x-4'>
					{!dashboard && (
						<a href={`https://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}>Dashboard</a>
					)}
					<UserNav user={user} />
					<ModeToggle />
				</div>
			</div>
		</div>
	);
};
