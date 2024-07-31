import type { PageParams } from '../_types';

import { Heading } from '@/components/heading';

import { DashboardHeader } from './_components/dashboard-header';

export default async function ProjectPage({}: PageParams) {
	return (
		<div>
			<DashboardHeader />
			<div className='p-2 sm:p-4 md:p-6'>
				<Heading tag='h1'>Here's how your project is looking</Heading>
			</div>
		</div>
	);
}
