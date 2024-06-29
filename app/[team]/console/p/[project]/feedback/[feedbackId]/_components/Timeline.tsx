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
		createdAt: new Date(),
		user: {
			name: 'John Doe',
			username: 'johndoe',
		},
	},
	{
		type: 'comment',
		status: null,
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
		createdAt: new Date(),
		user: {
			name: 'John Doe',
			username: 'johndoe',
		},
	},
	{
		type: 'comment',
		status: null,
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
		<li className='flex gap-4 py-8 first-of-type:mt-0'>
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
				<div>{item.content}</div>
			</div>
		</li>
	);
};

const Edit = ({ item }: { item: Item }) => {
	const params = useParams();
	return (
		<li className='flex items-center gap-2 bg-gradient-to-r from-accent/50 to-transparent p-4 first-of-type:mt-0'>
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
		<li className='flex items-center gap-2 bg-gradient-to-r from-accent/50 to-transparent p-4 first-of-type:mt-0'>
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

export default function Timeline() {
	if (!items || items.length <= 0) {
		return <div>No history found.</div>;
	}
	return (
		<ul className='flex flex-col divide-y'>
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
