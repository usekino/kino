'use client';

import { Calendar, CirclePlus, CircleX, FilePlus, PenLine } from 'lucide-react';
// TODO: ^ separate this into smaller client components
//
import Link from 'next/link';
import { useParams } from 'next/navigation';

const items = [
	{
		type: 'status',
		status: 'open',
		content: `Feedback created`,
		commentAttachments: null,
		createdAt: new Date(),
		user: {
			name: 'John Doe',
			username: 'johndoe',
		},
	},
	{
		type: 'comment',
		status: null,
		commentAttachments: [
			// placeholder image
			'https://pbs.twimg.com/media/GMUNeiIbwAA71f6?format=jpg&name=4096x4096',
			'https://pbs.twimg.com/media/GK80s7AaoAA0OzU?format=jpg&name=4096x4096',
		],
		content: `Eum dicta eos est sunt. Dolorem fugit amet exercitationem minus. Illo labore soluta cum cupiditate perspiciatis soluta eligendi. Maxime blanditiis corporis veritatis.<br/><br/> In soluta maxime magnam. Magnam eos dignissimos aut aut id officiis distinctio quod.
Repellat occaecati sapiente praesentium commodi necessitatibus possimus facere sed sed. Praesentium iusto quasi consequuntur totam corrupti cum. Eligendi voluptatibus facilis repellendus culpa.
Occaecati nam provident temporibus debitis asperiores eaque reprehenderit laborum dolorem. Aliquam in pariatur. Sit culpa fugiat beatae eius cum modi dolor. <br/><br/> Similique aut natus minima. Soluta a optio a fugiat cupiditate hic modi dolorum culpa. Dolorum aspernatur perspiciatis.
Hic tempora quia hic saepe sequi atque fuga quaerat exercitationem. Soluta ab distinctio beatae voluptates fuga perferendis quisquam amet aperiam.<br/><br/> Earum provident consequatur nemo eligendi voluptates voluptatibus quaerat nesciunt. Sapiente ipsam nam sapiente ab. A sit fugiat maxime architecto quasi harum adipisci quo. Vitae nemo sequi iusto impedit voluptatem neque rem.
In tempora maxime. Reiciendis velit ut accusamus repudiandae quas. Consequatur enim iure eaque aperiam officia deserunt dolore dolorem. Quae aperiam vero at.`,
		createdAt: new Date(),
		user: {
			name: 'John Doe',
			username: 'johndoe',
		},
	},
	{
		type: 'comment',
		status: null,
		commentAttachments: null,
		content:
			'Accusantium numquam consectetur id sunt exercitationem eius suscipit. Eligendi perspiciatis sed. Tempore cum dolorum repellat nisi harum quam quos odio quia. Velit minima consectetur animi odit laboriosam quis explicabo. Veritatis deleniti sint facilis enim eum quos vel at. Voluptate soluta nobis quos id.',
		createdAt: new Date(),
		user: {
			name: 'Nate Dunn',
			username: 'natedunn',
		},
	},
	{
		type: 'edit',
		status: null,
		commentAttachments: null,
		content: `Changed the title from 'Something' to 'Something else'`,
		createdAt: new Date(),
		user: {
			name: 'Nate Dunn',
			username: 'natedunn',
		},
	},
	{
		type: 'comment',
		status: null,
		commentAttachments: null,
		content:
			'Hic ipsa id architecto saepe vel. Aut eum fugit sapiente. Enim deserunt occaecati. Soluta laboriosam repudiandae quibusdam ad cumque deserunt excepturi. Quo et eveniet nesciunt. Pariatur deserunt eveniet dicta officia iure totam dicta.',
		createdAt: new Date(),
		user: {
			name: 'John Doe',
			username: 'johndoe',
		},
	},
	{
		type: 'status',
		status: 'closed',
		commentAttachments: null,
		content: `This feedback has been closed`,
		createdAt: new Date(),
		user: {
			name: 'Nate Dunn',
			username: 'natedunn',
		},
	},
	{
		type: 'comment',
		status: null,
		commentAttachments: null,
		content:
			'Quia quia voluptatem. Quis quis voluptas. Et et voluptas. Voluptatem voluptate voluptas.',
		createdAt: new Date(),
		user: {
			name: 'Nate Dunn',
			username: 'natedunn',
		},
	},
];

type Item = (typeof items)[number];

const Comment = ({ item }: { item: Item }) => {
	const params = useParams();

	return (
		<li className='update-comment flex gap-4 py-8 first-of-type:mt-0'>
			<div className='flex items-start gap-2'>
				<div className='mt-0.5 size-10 rounded-full border bg-gradient-to-tr from-native to-accent'></div>
			</div>
			<div className='flex flex-col gap-1'>
				<div className='text-muted-foreground'>
					<Link
						className='font-semibold  hocus:underline'
						href={`/console/p/${params.project}/u/${item.user.username}`}
					>
						{item.user.name} (@{item.user.username})
					</Link>
					{/* {` `}
					<span>commented:</span> */}
				</div>
				<div dangerouslySetInnerHTML={{ __html: item.content }} />
				{!!item.commentAttachments && (
					<div>
						<span className='select-none text-xs font-bold uppercase tracking-wide opacity-25'>
							Attachments
						</span>
						<div className='flex gap-2'>
							{item.commentAttachments?.map((attachment) => (
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
				)}
			</div>
		</li>
	);
};

const Edit = ({ item }: { item: Item }) => {
	const params = useParams();
	return (
		<li className='flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent/50 to-transparent p-4 first-of-type:mt-0'>
			<div>
				<PenLine size={20} className='text-primary' />
			</div>
			{/* TODO: add icons for different types of items */}
			<div className='text-sm'>{item.content}</div>
			<div className='flex items-center gap-1 text-sm text-muted-foreground'>
				<span>by</span>
				<Link
					className='hocus:underline'
					href={`/console/p/${params.project}/u/${item.user.username}`}
				>
					@{item.user.username}
				</Link>
			</div>
		</li>
	);
};

const Status = ({ item }: { item: Item }) => {
	const params = useParams();

	const status = item.status as 'open' | 'planned' | 'closed';

	if (!status) {
		return null;
	}

	const statusIcon = {
		open: CirclePlus,
		planned: Calendar,
		closed: CircleX,
	} as const;

	const Icon = statusIcon[status];

	return (
		<li className='flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent/50 to-transparent p-4 first-of-type:mt-0'>
			<div>
				<Icon size={20} className='text-primary' />
			</div>
			{/* TODO: add icons for different types of items */}
			<div className='text-sm'>{item.content}</div>
			<div className='flex items-center gap-1 text-sm text-muted-foreground'>
				<span>by</span>
				<Link
					className='hocus:underline'
					href={`/console/p/${params.project}/u/${item.user.username}`}
				>
					@{item.user.username}
				</Link>
			</div>
		</li>
	);
};

export default function Updates() {
	if (!items || items.length <= 0) {
		return <div>No history found.</div>;
	}
	return (
		<ul className='flex flex-col'>
			{items.map((item, index) => {
				switch (item.type) {
					case 'comment':
						return <Comment key={index} item={item} />;
					case 'edit':
						return <Edit key={index} item={item} />;
					case 'status':
						return <Status key={index} item={item} />;
					default:
						return null;
				}
			})}
		</ul>
	);
}
