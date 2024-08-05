import { CircleCheck, CircleDotDashed } from 'lucide-react';
import Link from 'next/link';

// import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { AssignedTo } from './_components/AssignedTo';
import Updates from './_components/Updates';
import { PageParams } from './_types';

type Status = 'open' | 'planned' | 'closed';

export const Status = ({ status }: { status: Status }) => {
	const statusClass = {
		open: 'bg-green-700/50 text-green-100',
		planned: 'bg-blue-700/50 text-blue-100',
		closed: 'bg-red-700/50 text-red-100',
	};

	return (
		<span
			className={cn(statusClass[status], 'inline-block rounded px-1.5 py-0.5 text-xs capitalize')}
		>
			{status}
		</span>
	);
};

export default async function FeedbackIdPage({ params }: PageParams) {
	const feedback = {
		id: params.feedbackId,
		title: 'This is a feature request',
		status: 'open',
		upvotes: 0,
		assignedTo: 'natedunn',
		assignedBy: 'davinbuster',
		filedIn: 'features',
	};

	return (
		<div className='container !mx-0 flex flex-col gap-4 p-2 sm:p-4 md:p-6'>
			<div className='grid gap-4 md:grid-cols-12'>
				<div className='order-first md:order-last md:col-span-4'>
					<div className='sticky top-4 flex flex-col gap-4'>
						{/* Assigned to */}
						<AssignedTo />
						<div className='rounded-lg border bg-muted p-4'>
							<span className='select-none text-xs font-bold uppercase tracking-wide opacity-25'>
								Details
							</span>
							<ul className='mt-4 flex w-full flex-col justify-center gap-3'>
								<li className='flex w-full justify-between gap-2'>
									<span className='text-xs font-semibold uppercase tracking-wide opacity-50'>
										Status:
									</span>
									<Status status={feedback.status as Status} />
								</li>
								<li className='flex w-full items-center justify-between gap-2'>
									<span className='text-xs font-semibold uppercase tracking-wide opacity-50'>
										Upvotes:
									</span>{' '}
									<span className='rounded bg-accent p-1 text-xs font-semibold uppercase tracking-wide opacity-50'>
										{feedback.upvotes}
									</span>
								</li>
								<li className='flex w-full items-center justify-between gap-2'>
									<span className='text-xs font-semibold uppercase tracking-wide opacity-50'>
										Assigned By:
									</span>{' '}
									<Link
										className='text-sm hocus:underline'
										href={`/console/p/${params.project}/u/${feedback.assignedBy}`}
									>
										{feedback.assignedBy}
									</Link>
								</li>
								<li className='flex w-full items-center justify-between gap-2'>
									<span className='text-xs font-semibold uppercase tracking-wide opacity-50'>
										Board:
									</span>{' '}
									<span className='text-xs font-semibold uppercase tracking-wide opacity-50'>
										{feedback.filedIn}
									</span>
								</li>
							</ul>
						</div>
						<div className='flex gap-2'>
							<Button variant='outline' className='gap-2'>
								<CircleCheck size={16} />
								Mark as complete
							</Button>
							<Button variant='outline' className='gap-2'>
								<CircleDotDashed size={16} />
								Mark as in progress
							</Button>
						</div>
					</div>
				</div>
				<div className='md:col-span-8'>
					<Updates />
					<div className='mt-6 flex gap-3 rounded-lg border bg-accent/30 p-4'>
						<Textarea rows={1} placeholder='Leave a comment...' />
						<div>
							<Button className='gap-2'>Comment</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
