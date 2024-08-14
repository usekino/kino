import { deconstructTeamSlug } from '@/app/[team]/_lib/get-team';
import { api } from '@/lib/trpc/clients/server-invoker';

import { FeedbackTable } from '../_components/feedback-table';
import { PageProps } from '../../_types';

export default async function FeedbackPage({ params }: PageProps) {
	const { subdomain } = deconstructTeamSlug(params.team);
	subdomain;

	const { project: slug } = params;

	const feedback = await api.feedback.findByProject({ slug });

	return (
		<div className='p-2 sm:p-4 md:p-6'>
			<div className='overflow-hidden rounded-lg border bg-muted'>
				{feedback ? <FeedbackTable feedback={feedback} /> : <div>No feedback found</div>}
			</div>
		</div>
	);
}
