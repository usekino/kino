import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { ListItem } from './item';

export const List = () => {
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-center justify-between gap-4'>
				<nav className='flex items-center gap-3'>
					<Input placeholder='Search feedback' />
					<Select defaultValue='recent'>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Sort' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='popular'>Popular</SelectItem>
							<SelectItem value='recent'>Recent</SelectItem>
							<SelectItem value='oldest'>Oldest</SelectItem>
						</SelectContent>
					</Select>
				</nav>
				<div>
					<Button className='gap-2'>
						<Plus size={14} />
						Add feedback
					</Button>
				</div>
			</div>
			<ul className='grid gap-4'>
				<ListItem />
				<ListItem />
				<ListItem />
			</ul>
		</div>
	);
};
