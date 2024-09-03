import { Home } from 'lucide-react';

import { ProjectWrapper } from '../../_components/project-wrapper';

export const DashboardHeader = () => {
	return (
		<header>
			<ProjectWrapper icon={Home} title='Dashboard' />
		</header>
	);
};
