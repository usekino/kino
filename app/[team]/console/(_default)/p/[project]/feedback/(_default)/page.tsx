import { deconstructTeamSlug } from '@/app/[team]/_lib/get-team';
import { api } from '@/lib/trpc/clients/server-http';

import { FeedbackTable } from '../_components/feedback-table';
import { feedbackHeaderProps } from '../_lib/feedback-header-props';
import { ConsoleHeader } from '../../_components/console-header';
import { PageProps } from '../../_types';

export default async function FeedbackPage({ params }: PageProps) {
	const { subdomain: teamSlug } = deconstructTeamSlug(params.team);
	const { project: projectSlug } = params;
	const feedback = await api.feedback.projectTable.query({ teamSlug, projectSlug });
	return (
		<div>
			<ConsoleHeader {...feedbackHeaderProps} breadcrumbs={['Viewer']} />
			<div className='container pt-6'>
				<div className='w-full'>
					<div className='h-full overflow-scroll rounded-lg border bg-muted'>
						{feedback ? (
							<FeedbackTable feedback={feedback} />
						) : (
							<div className='p-4 text-center'>No feedback found</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
