const items = [
	{
		type: 'comment',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
		createdAt: new Date(),
		user: {
			name: 'John Doe',
			username: 'johndoe',
		},
	},
	{
		type: 'edit',
		content: `Changed the title from 'Something' to 'Something else'`,
		createdAt: new Date(),
		user: {
			name: 'Nate Dunn',
			username: 'natedunn',
		},
	},
];

type Item = (typeof items)[number];

const Comment = ({ item }: { item: Item }) => {
	return (
		<li className='mt-4 flex items-center gap-2 pt-4 first-of-type:mt-0'>
			<div className='flex items-center gap-2'>
				<div className='h-6 w-6 rounded-full bg-accent'></div>
				<div className='text-xs font-semibold uppercase tracking-wide opacity-50'>
					{item.user.name}
				</div>
			</div>
			{/* TODO: add icons for different types of items */}
			<div className='text-sm'>{item.content}</div>
		</li>
	);
};

const Edit = ({ item }: { item: Item }) => {
	return (
		<li className='mt-4 flex items-center gap-2 pt-4 first-of-type:mt-0'>
			<div className='flex items-center gap-2'>
				<div className='h-6 w-6 rounded-full bg-accent'></div>
				<div className='text-xs font-semibold uppercase tracking-wide opacity-50'>
					{item.user.name}
				</div>
			</div>
			{/* TODO: add icons for different types of items */}
			<div className='text-sm'>{item.content}</div>
		</li>
	);
};

export default function Timeline() {
	return (
		<ul className='flex flex-col divide-y'>
			{items.map((item, index) => {
				if (item.type === 'comment') {
					return <Comment key={index} item={item} />;
				}
				if (item.type === 'edit') {
					return <Edit key={index} item={item} />;
				}
			})}
		</ul>
	);
}
