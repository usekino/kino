import Link from 'next/link';

import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import Timeline from './_components/Timeline';
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
		description: `Eum dicta eos est sunt. Dolorem fugit amet exercitationem minus. Illo labore soluta cum cupiditate perspiciatis soluta eligendi. Maxime blanditiis corporis veritatis.<br/><br/> In soluta maxime magnam. Magnam eos dignissimos aut aut id officiis distinctio quod.
Repellat occaecati sapiente praesentium commodi necessitatibus possimus facere sed sed. Praesentium iusto quasi consequuntur totam corrupti cum. Eligendi voluptatibus facilis repellendus culpa.
Occaecati nam provident temporibus debitis asperiores eaque reprehenderit laborum dolorem. Aliquam in pariatur. Sit culpa fugiat beatae eius cum modi dolor. <br/><br/> Similique aut natus minima. Soluta a optio a fugiat cupiditate hic modi dolorum culpa. Dolorum aspernatur perspiciatis.
Hic tempora quia hic saepe sequi atque fuga quaerat exercitationem. Soluta ab distinctio beatae voluptates fuga perferendis quisquam amet aperiam.<br/><br/> Earum provident consequatur nemo eligendi voluptates voluptatibus quaerat nesciunt. Sapiente ipsam nam sapiente ab. A sit fugiat maxime architecto quasi harum adipisci quo. Vitae nemo sequi iusto impedit voluptatem neque rem.
In tempora maxime. Reiciendis velit ut accusamus repudiandae quas. Consequatur enim iure eaque aperiam officia deserunt dolore dolorem. Quae aperiam vero at.`,
		upvotes: 0,
		assignedTo: 'natedunn',
		assignedBy: 'davinbuster',
		filedIn: 'features',
		attachments: [
			// placeholder image
			'https://pbs.twimg.com/media/GMUNeiIbwAA71f6?format=jpg&name=4096x4096',
			'https://pbs.twimg.com/media/GK80s7AaoAA0OzU?format=jpg&name=4096x4096',
		],
	};

	return (
		<div className='flex flex-col gap-6 p-2 sm:p-4 md:p-6'>
			<div className='overflow-hidden rounded-lg border bg-muted'>
				<div className='grid grid-cols-12 '>
					<div className='col-span-9 flex flex-col'>
						<div className='flex flex-col gap-4 p-6'>
							<div className='flex flex-col gap-2'>
								<span className='select-none text-xs font-bold uppercase tracking-wide opacity-25'>
									Title
								</span>
								<Heading tag='h1' variant='h3'>
									{feedback.title}
								</Heading>
							</div>
							<div className='flex flex-col gap-2'>
								<span className='select-none text-xs font-bold uppercase tracking-wide opacity-25'>
									Description
								</span>
								<div>
									{/* TODO: use a markdown library */}
									<p dangerouslySetInnerHTML={{ __html: feedback.description }} />
								</div>
							</div>
							<div className='flex flex-col gap-2'>
								<span className='select-none text-xs font-bold uppercase tracking-wide opacity-25'>
									Attachments
								</span>
								<div className='flex gap-2'>
									{feedback.attachments.map((attachment) => (
										<button
											// onClick={() => alert('Open attachment')}
											key={attachment}
											className='flex gap-2 overflow-hidden rounded-lg border bg-native transition-all duration-200 ease-in-out hocus:scale-105 '
										>
											<img src={attachment} alt='' className='max-h-20 w-auto' />
										</button>
									))}
								</div>
							</div>
						</div>
						{/* Comments section */}
					</div>
					<div className='col-span-3 border-l p-6'>
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
			</div>
			<div className='rounded-lg border bg-muted'>
				<div className='flex flex-col gap-3 p-6'>
					<Heading tag='h3'>Timeline</Heading>
					<Timeline />
				</div>
				<div className='flex flex-col gap-3 border-t p-6'>
					<Textarea placeholder='Leave a comment...' />
					<div>
						<Button>Post</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
