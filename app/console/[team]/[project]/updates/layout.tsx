import type { ProjectLayoutParams } from '../_lib/utils';

import { Rss } from 'lucide-react';

import { ProjectHeader } from '../_components/project-header';

export default async function UpdatesPagesLayout({ children }: ProjectLayoutParams) {
	return (
		<div>
			<ProjectHeader icon={Rss} title='Updates' links={[{ href: '/test	', title: 'Settings' }]} />
			<>{children}</>
		</div>
	);
}
