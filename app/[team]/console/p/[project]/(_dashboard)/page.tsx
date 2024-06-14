import type { ProjectPageParams } from '../_lib/utils';

import { Home } from 'lucide-react';

import { Dashboard } from '@/components/dashboard';

import { ProjectWrapper } from '../_components/project-wrapper';

export default async function ProjectPage({}: ProjectPageParams) {
	return (
		<ProjectWrapper
			icon={Home}
			title='Dashboard'
			links={[
				{
					title: 'Settings',
					href: '#',
				},
			]}
		>
			<div className='container py-6'>
				<Dashboard />
			</div>
		</ProjectWrapper>
	);
}
