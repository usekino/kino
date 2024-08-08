// import { api } from '@/lib/trpc/clients/server-invoker';

import { deconstructTeamSlug } from '@/app/[team]/_lib/get-team';

import { FeedbackTable } from '../_components/feedback-table';
import { PageProps } from '../../_types';

export default async function FeedbackPage({ params }: PageProps) {
	const { subdomain: slug } = deconstructTeamSlug(params.team);

	slug;

	return (
		<div className='p-2 sm:p-4 md:p-6'>
			<div className='overflow-hidden rounded-lg border bg-muted'>
				<FeedbackTable />
			</div>
		</div>
	);
}
