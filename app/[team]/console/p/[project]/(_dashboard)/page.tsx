import type { PageParams } from '../_types';

import { Home } from 'lucide-react';

import { Dashboard } from '@/components/dashboard';

import { ProjectWrapper } from '../_components/project-wrapper';

export default async function ProjectPage({}: PageParams) {
	return (
		<div>
			<ProjectWrapper
				icon={Home}
				title='Dashboard'
				links={[
					{
						title: 'Settings',
						href: '#',
					},
				]}
			/>
			<Dashboard />
		</div>
	);
}
