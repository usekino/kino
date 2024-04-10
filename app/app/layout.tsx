import { cookies } from 'next/headers';

import { MainNav } from '@/components/section/main-nav';
import { Toaster } from '@/components/ui/sonner';
import { checkAuth } from '@/lib/auth/utils';
import TrpcProvider from '@/lib/trpc/Provider';

import { DashboardNav } from './_components/dashboard-nav';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
	await checkAuth();
	return (
		<main>
			<div className='flex h-screen'>
				<div className='flex h-screen w-full flex-col'>
					<MainNav />
					<DashboardNav />
					<div className='flex-auto bg-muted px-6 py-6 md:px-10'>{children}</div>
				</div>
			</div>
		</main>
	);
}
