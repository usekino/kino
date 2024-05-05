import { Home } from 'lucide-react';

import { Dashboard } from '@/components/dashboard';

import { ProjectHeader } from './_components/project-header';
import { ProjectPageParams } from './_lib/utils';

export default async function ProjectPage({}: ProjectPageParams) {
	return (
		<div>
			<ProjectHeader icon={Home} title='Dashboard' links={[{ href: '/test	', title: 'Settings' }]} />
			<div className='container py-6'>
				<Dashboard />
			</div>
		</div>
	);
}
