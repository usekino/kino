import { PageParams } from '../_types';
import { FeedbackHeader } from './_components/feedback-header';
import { FeedbackTable } from './_components/feedback-table';

export default async function FeedbackPage({}: PageParams) {
	return (
		<>
			<FeedbackHeader />
			<div className='p-2 sm:p-4 md:p-6'>
				<div className='overflow-hidden rounded-lg border bg-muted'>
					<FeedbackTable />
				</div>
			</div>
		</>
	);
}
