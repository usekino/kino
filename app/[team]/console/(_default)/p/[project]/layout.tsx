import type { LayoutProps } from './_types';

import { LockKeyhole } from 'lucide-react';
import { cookies } from 'next/headers';

import { deconstructTeamParam } from '@/app/[team]/_lib/deconstruct-team-param';
import { AppSidebar } from '@/components/app-sidebar';
import { Heading } from '@/components/heading';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { api } from '@/lib/trpc/clients/server-invoker';

export default async function ProjectPageLayout({ params, children }: LayoutProps) {
	const project = await api.project.findBySlug({
		slug: (await params).project,
	});
	const { subdomain: teamSlug } = deconstructTeamParam((await params).team);

	const cookieStore = await cookies();
	const sidebarCookie = cookieStore.get('sidebar:state');
	const sidebarOpen = sidebarCookie?.value === 'true';

	// Make sure project exits and is owned by the team
	if (!project || project.team.slug !== teamSlug) {
		return (
			<div className='flex h-screen w-full flex-col items-center justify-center gap-2 bg-diagonal bg-[length:10px_10px]'>
				<div className='flex flex-col items-center justify-center gap-2 rounded-xl bg-destructive p-10 text-sm text-destructive-foreground'>
					<LockKeyhole size={50} />
					<Heading tag='h1' variant='h4'>
						This team does not own this project.
					</Heading>
				</div>
			</div>
		);
	}

	console.log('sidebarCookie', sidebarOpen);

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
					<div className='flex items-center gap-2 px-4'>
						<SidebarTrigger className='-ml-1' />
						<Separator orientation='vertical' className='mr-2 h-4' />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className='hidden md:block'>
									<BreadcrumbLink href='#'>Building Your Application</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className='hidden md:block' />
								<BreadcrumbItem>
									<BreadcrumbPage>Data Fetching</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div>{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
