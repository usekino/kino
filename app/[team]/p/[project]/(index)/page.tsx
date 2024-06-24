import type { PageProps } from '../_types';

import { ProjectDashboard } from './_components/project-dashboard';

export default async function ProjectPage({}: PageProps) {
	return (
		<div className='container py-6'>
			<ProjectDashboard />
		</div>
	);
}
