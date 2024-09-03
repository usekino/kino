import { Rss } from 'lucide-react';

import { ProjectWrapper } from '../../_components/project-wrapper';

export const UpdatesHeader = () => {
	return (
		<header>
			<ProjectWrapper icon={Rss} title='Updates' />
		</header>
	);
};
