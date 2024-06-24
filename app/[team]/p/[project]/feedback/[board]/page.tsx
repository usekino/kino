import type { PageProps } from './_types';

import { List } from '../_components/list';

export default async function FeedbackPageBugs({ params }: PageProps) {
	return (
		<div>
			<h1 className='mb-4 text-3xl font-semibold'>{params.board ?? 'All'}</h1>
			<List />
		</div>
	);
}
