import { DashboardNav } from './_components/dashboard-nav';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='flex h-screen w-full'>
			<div className='bg-muted'>
				<DashboardNav />
			</div>
			<div className='flex-auto overflow-scroll'>{children}</div>
		</main>
	);
}
