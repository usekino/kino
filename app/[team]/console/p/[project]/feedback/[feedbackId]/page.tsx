import { SendHorizonal } from 'lucide-react';
import Link from 'next/link';

import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

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

export default function FeedbackIdPage({ params }: PageParams) {
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
		<div className='flex flex-col gap-4 p-2 sm:p-3 md:p-4'>
			<div className='overflow-hidden rounded-lg border bg-muted'>
				<div className='grid grid-cols-12'>
					<div className='col-span-9 flex flex-col'>
						<div className='flex flex-col gap-4 p-4'>
							<div className='flex flex-col gap-2'>
								<Heading tag='h1' variant='h3'>
									{feedback.title}
								</Heading>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='grid gap-4 md:grid-cols-12'>
				<div className='order-first md:order-last md:col-span-4'>
					<div className='sticky top-6 rounded-lg border bg-muted p-4'>
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
									Assigned To:
								</span>{' '}
								<Link
									className='text-sm hocus:underline'
									href={`/console/p/${params.project}/u/${feedback.assignedTo}`}
								>
									{feedback.assignedTo}
								</Link>
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
				</div>
				<div className='rounded-lg border bg-muted md:col-span-8'>
					<div className='flex flex-col gap-3 p-4'>
						<Updates />
					</div>
					<div className='sticky bottom-0 flex gap-3 rounded-b-lg border-t bg-muted p-4'>
						<Textarea rows={1} placeholder='Leave a comment...' />
						<div>
							<Button className='gap-2'>
								<SendHorizonal size={16} />
								<span>Post</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
