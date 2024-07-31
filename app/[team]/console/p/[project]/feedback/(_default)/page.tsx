import { FeedbackTable } from '../_components/feedback-table';
import { PageParams } from '../../_types';

export default async function FeedbackPage({}: PageParams) {
	return (
		<div className='p-2 sm:p-4 md:p-6'>
			<div className='overflow-hidden rounded-lg border bg-muted'>
				<FeedbackTable />
			</div>
		</div>
	);
}
