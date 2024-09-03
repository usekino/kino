import { Map } from 'lucide-react';

import { ProjectWrapper } from '../../_components/project-wrapper';
import { SettingsNav } from './roadmap-nav';

export const RoadmapHeader = () => {
	return (
		<header>
			<ProjectWrapper icon={Map} title='Roadmap'>
				<SettingsNav />
			</ProjectWrapper>
		</header>
	);
};
