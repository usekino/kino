// import { Links } from "./links";
import Link from 'next/link';

import { getUser } from '@/lib/auth/utils';

// import { Links } from './links';
import { Search } from './search';
// import TeamSwitcher from './team-switcher';
import { UserNav } from './user-nav';

export const MainNav = async () => {
	const user = await getUser();
	if (!user) return null;

	return (
		<div className='border-b'>
			<div className='flex h-16 items-center px-6 md:px-8'>
				<Link
					href={user ? '/app' : '/'}
					className='mr-6 font-bold tracking-widest hover:underline hover:decoration-2 hover:underline-offset-2'
				>
					KINO
				</Link>
				<Search />
				<div className='ml-auto flex items-center space-x-4'>
					<Link href='/app'>Dashboard</Link>
					<UserNav user={user} />
				</div>
			</div>
		</div>
	);
};
