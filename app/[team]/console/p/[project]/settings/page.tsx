import { Settings } from 'lucide-react';

import { ProjectWrapper } from '../_components/project-wrapper';
import { ProjectSettings } from './_components/project-settings';

export default async function SettingsPage() {
	return (
		<ProjectWrapper
			icon={Settings}
			title='Project Settings'
			links={[{ href: '/test	', title: 'Settings' }]}
		>
			<div className='container py-6'>
				<ProjectSettings />
			</div>
		</ProjectWrapper>
	);
}
