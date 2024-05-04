import { MainNav } from '@/components/section/main-nav';

import { DashboardNav } from './_components/dashboard-nav';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<div className='flex h-screen'>
				<div className='flex h-screen w-full flex-col'>
					<div className='bg-card'>
						<MainNav dashboard={true} />
						<DashboardNav />
					</div>
					<div className='flex-auto'>{children}</div>
				</div>
			</div>
		</main>
	);
}
