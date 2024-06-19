import type { ProjectPageParams } from '../../_lib/utils';

import { List } from '../_components/list';

type Props = {
	params: {
		board: string;
	} & ProjectPageParams;
};

export default async function FeedbackPageBugs({ params }: Props) {
	return (
		<div>
			<h1 className='mb-4 text-3xl font-semibold'>{params.board ?? 'All'}</h1>
			<List />
		</div>
	);
}
