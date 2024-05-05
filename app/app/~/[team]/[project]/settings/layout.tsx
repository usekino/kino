import type { ProjectLayoutParams } from '../_lib/utils';

import { Settings } from 'lucide-react';

import { ProjectHeader } from '../_components/project-header';

export default async function SettingsPagesLayout({ children }: ProjectLayoutParams) {
	return (
		<div>
			<ProjectHeader
				icon={Settings}
				title='Project Settings'
				links={[{ href: '/test	', title: 'Settings' }]}
			/>
			<>{children}</>
		</div>
	);
}
