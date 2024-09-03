import type { PageProps } from '../_types';

import { Heading } from '@/components/heading';

import { DashboardHeader } from './_components/dashboard-header';

export default async function ProjectPage({ params }: PageProps) {
	return (
		<div>
			<DashboardHeader />
			<div className='p-2 sm:p-4 md:p-6'>
				<Heading tag='h1'>Dashboard for {params.project}</Heading>
			</div>
		</div>
	);
}
