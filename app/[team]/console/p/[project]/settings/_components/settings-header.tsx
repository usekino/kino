import { MessageSquare } from 'lucide-react';

import { ProjectWrapper } from '../../_components/project-wrapper';

// import { SettingsNav } from './settings-nav';

export const SettingsHeader = () => {
	return (
		<header>
			<ProjectWrapper icon={MessageSquare} title='Settings' />
		</header>
	);
};
