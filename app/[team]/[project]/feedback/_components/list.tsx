import { Input } from '@/components/ui/input';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { AddDialog } from './add-dialog';
import { ListItem } from './list-item';

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
					<AddDialog />
				</div>
			</div>
			<ul className='grid gap-4'>
				<ListItem />
				<ListItem />
				<ListItem />
			</ul>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href='#' />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href='#'>1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href='#' />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};
