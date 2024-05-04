import { ProjectPageParams } from '../_lib/utils';
import { FeedbackTable } from './_components/feedback-table';

export default async function FeedbackPage({}: ProjectPageParams) {
	return (
		<div className='container py-6'>
			<FeedbackTable />
		</div>
	);
}
