import type { ProjectPageParams } from '../_lib/utils';

import { Home } from 'lucide-react';

import { Dashboard } from '@/components/dashboard';

import { ProjectWrapper } from '../_components/project-wrapper';

export default async function ProjectPage({}: ProjectPageParams) {
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
