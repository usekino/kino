import { Check, UsersRound } from 'lucide-react';
import Link from 'next/link';

import { Heading } from '@/components/heading';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { checkAuth } from '@/lib/auth/utils';
import { env } from '@/lib/env/server';
import { api } from '@/lib/trpc/clients/server-invoker';
import { groupProjectsByTeam } from '@/lib/utils/project.utils';

import { deconstructTeamParam } from '../_lib/deconstruct-team-param';
import { PageProps } from './../_types';

export default async function ConsolePage({ params }: PageProps) {
	await checkAuth();

	const projects = await api.project.getUserProjects({ groupByTeam: true });
	const teamProjects = groupProjectsByTeam(projects);

	const { subdomain: teamSlug } = deconstructTeamParam(params.team);

	return (
		<div className='p-2 sm:p-4 md:p-6'>
			<div className='flex flex-col gap-6'>
				<div className='flex flex-col gap-2'>
					<Heading tag='h1'>Select a project</Heading>
					<p className='text-muted-foreground'>
						Below are a list of all your projects grouped by team.
					</p>
				</div>
				<div className='flex flex-col gap-12'>
					{teamProjects?.map((team) => (
						<div key={team.id}>
							<div className='flex items-center gap-2'>
								<div>
									<UsersRound size={24} className='text-muted-foreground' />
								</div>
								<Heading tag='h2' variant='h3'>
									{team.name}
								</Heading>
								{teamSlug === team.slug ? (
									<TooltipProvider delayDuration={200}>
										<Tooltip>
											<TooltipTrigger asChild>
												<div className='flex items-center gap-1 rounded-md border border-amber-400/50 bg-amber-500/20 px-1.5 py-1 text-xs text-amber-400'>
													<Check size={12} />
													Current
												</div>
											</TooltipTrigger>
											<TooltipContent className='max-w-[200px] text-center'>
												<p>The team domain you are currently on.</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								) : null}
							</div>
							<div className='mt-2 grid grid-cols-12 gap-4'>
								{team.projects.map((project) => (
									<Link
										href={`https://${team.slug}.${env.NEXT_PUBLIC_ROOT_DOMAIN}/console/p/${project.slug}`}
										className='group col-span-4 flex items-center justify-center rounded-lg bg-card p-10 transition-colors hocus:bg-accent'
										key={project.id}
									>
										<Heading tag='h3' variant='h4' className='group-hocus:underline'>
											{project.name}
										</Heading>
										<div className='mt-2'>
											<p>{project.description}</p>
										</div>
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
