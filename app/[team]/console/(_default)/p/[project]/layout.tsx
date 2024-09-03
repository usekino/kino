import type { LayoutProps } from './_types';

import { LockKeyhole } from 'lucide-react';

import { deconstructTeamSlug } from '@/app/[team]/_lib/get-team';
import { Heading } from '@/components/heading';
import { api } from '@/lib/trpc/clients/server-invoker';

export default async function ProjectPageLayout({ params, children }: LayoutProps) {
	const project = await api.project.findBySlug({
		slug: params.project,
	});
	const { subdomain: teamSlug } = deconstructTeamSlug(params.team);

	// Make sure project exits and is owned by the team
	if (!project || project.team.slug !== teamSlug) {
		return (
			<div className='flex h-screen w-full flex-col items-center justify-center gap-2 bg-diagonal bg-[length:10px_10px]'>
				<div className='flex flex-col items-center justify-center gap-2 rounded-xl bg-destructive p-10 text-sm text-destructive-foreground'>
					<LockKeyhole size={50} />
					<Heading tag='h1' variant='h4'>
						This team does not own this project.
					</Heading>
				</div>
			</div>
		);
	}

	return children;
}
