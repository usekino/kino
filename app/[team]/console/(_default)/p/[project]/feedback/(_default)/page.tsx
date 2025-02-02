// import type { PageProps } from '../../_types';

import { Suspense } from 'react';

// import { deconstructTeamParam } from '@/app/[team]/_lib/deconstruct-team-param';
// import { api } from '@/lib/trpc/clients/server-http';

import { FeedbackTable } from '../_components/feedback-table';
import { feedbackHeaderProps } from '../_lib/feedback-header-props';
import { ConsoleHeader } from '../../_components/console-header';

export default async function FeedbackPage() {
	// const { subdomain: teamSlug } = deconstructTeamParam(params.team);
	// const { project: projectSlug } = params;
	// const feedback = await api.console.feedback.table.query({ teamSlug, projectSlug });

	return (
		<div>
			<ConsoleHeader {...feedbackHeaderProps} breadcrumbs={['Viewer']} />
			<div className='container pt-6'>
				<div className='w-full'>
					<div className='h-full overflow-scroll rounded-lg border bg-muted'>
						<Suspense fallback={<div>Loading...</div>}>
							<FeedbackTable />
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	);
}
