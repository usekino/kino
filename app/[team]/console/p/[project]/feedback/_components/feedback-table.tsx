'use client';

import type {
	ColumnDef,
	ColumnFiltersState,
	PaginationState,
	SortingState,
	VisibilityState,
} from '@tanstack/react-table';

import * as React from 'react';
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const data: Feedback[] = [
	{
		id: 'e34609d0-222e-4df7-ab6d-6df0f8f6fc87',
		status: 'open',
		title: 'I want to be able to do this',
		description:
			'Ullamco non irure veniam labore voluptate commodo aute et aliquip fugiat eiusmod veniam.',
		upvotes: 25,
		assignedTo: '@natedunn',
		filedIn: null,
	},
	{
		id: '310a1901-2130-4575-9527-ca771208c907',
		status: 'planned',
		title: 'It would be great if we had this.',
		description: '',
		upvotes: 2,
		assignedTo: '@thecoolguy',
		filedIn: 'improvements',
	},
	{
		id: 'bac21731-9861-41b4-bd6c-7231c3a61c78',
		status: 'open',
		title: 'This is not working?',
		description:
			'Duis aliqua cillum elit mollit commodo cillum reprehenderit occaecat mollit ex veniam laboris exercitation.',
		upvotes: 6,
		assignedTo: null,
		filedIn: 'improvements',
	},
	{
		id: '2ea2b942-c6c0-48d0-8a93-d1c93913b79a',
		status: 'closed',
		title: 'This is bugged',
		description:
			'Dolore mollit cupidatat eiusmod ad ad proident anim irure. Consectetur deserunt qui non laborum sit reprehenderit id cupidatat laborum. Incididunt excepteur anim officia.',
		upvotes: 15,
		assignedTo: '@thecoolguy',
		filedIn: 'bugs',
	},
	{
		id: 'a52af6e2-6803-4584-928a-9ab3886efedd',
		status: 'planned',
		title: 'This is a feature request',
		description: 'Anim ea mollit est dolore incididunt non quis Lorem ex ad ex sint.',
		upvotes: 0,
		assignedTo: '@natedunn',
		filedIn: 'features',
	},
	{
		id: '0a9ef55f-f0e2-4d4c-b8dc-d3988a32cbf1',
		status: 'closed',
		title: 'WHY DONT WE HAVE',
		description: '',
		upvotes: 9,
		assignedTo: null,
		filedIn: null,
	},
	{
		id: 'ee974de7-963c-4475-9f3c-f1e3b71746d4',
		status: 'planned',
		title: 'Lets do this',
		description:
			'Officia magna adipisicing non deserunt sint adipisicing incididunt voluptate excepteur consequat mollit. Aliquip et elit sit occaecat laboris enim.',
		upvotes: 9,
		assignedTo: '@natedunn',
		filedIn: 'bugs',
	},
];

export type Feedback = {
	id: string;
	status: 'open' | 'planned' | 'closed';
	title: string;
	description: string;
	upvotes: number;
	assignedTo: string | null;
	filedIn: string | null;
};

export const columns = (baseUrl: string): ColumnDef<Feedback>[] => {
	return [
		// TODO: Uncomment this when we have a use for selections
		//
		// {
		// 	id: 'select',
		// 	header: ({ table }) => (
		// 		<Checkbox
		// 			checked={
		// 				table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
		// 			}
		// 			onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
		// 			aria-label='Select all'
		// 		/>
		// 	),
		// 	cell: ({ row }) => (
		// 		<Checkbox
		// 			checked={row.getIsSelected()}
		// 			onCheckedChange={(value) => row.toggleSelected(!!value)}
		// 			aria-label='Select row'
		// 		/>
		// 	),
		// 	enableSorting: false,
		// 	// enableHiding: false,
		// },
		{
			accessorKey: 'status',
			meta: {
				title: 'Status',
			},
			header: ({ column }) => {
				return (
					<button
						className='text-left hocus:text-native-foreground hocus:underline'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Status
					</button>
				);
			},
			cell: ({ row }) => {
				const status = row.getValue('status') as Feedback['status'];
				// return class string based on status
				const statusClass = {
					open: 'bg-green-700/50 text-green-100',
					planned: 'bg-blue-700/50 text-blue-100',
					closed: 'bg-red-700/50 text-red-100',
				};
				return (
					<span
						className={cn(
							statusClass[status],
							'inline-block rounded px-1.5 py-0.5 text-xs capitalize'
						)}
					>
						{status}
					</span>
				);
			},
		},
		{
			accessorKey: 'title',
			meta: {
				title: 'Title',
			},
			header: 'Title',
			cell: ({ row }) => {
				return (
					<a
						href={`${baseUrl}/${row.original.id}`}
						className='pointer-events-none line-clamp-3 font-medium group-hover:underline hocus:underline'
					>
						{row.getValue('title')}
					</a>
				);
			},
		},
		{
			accessorKey: 'description',
			meta: {
				title: 'Description',
			},
			header: 'Description',
			cell: ({ row }) => {
				const description: string = row.getValue('description') ?? '';
				if (!description) {
					return <span className='line-clamp-3 text-muted-foreground/50'>No description</span>;
				}
				const length = description.length;
				const max = 100;
				return (
					<span className='line-clamp-3 text-muted-foreground'>
						{length > max ? description.slice(0, max) + '...' : description}
					</span>
				);
			},
		},
		{
			accessorKey: 'upvotes',
			meta: {
				title: 'Upvotes',
			},
			header: ({ column }) => {
				return (
					<button
						className='text-left hocus:text-native-foreground hocus:underline'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Upvotes
					</button>
				);
			},
			cell: ({ row }) => {
				return (
					<div className='inline-flex size-8 items-center justify-center rounded-lg bg-native p-1 text-xs text-muted-foreground'>
						{row.getValue('upvotes')}
					</div>
				);
			},
		},
		{
			accessorKey: 'filedIn',
			meta: {
				title: 'Filed In',
			},
			header: 'Filed In',
			cell: ({ row }) => {
				if (!row.getValue('filedIn')) return null;
				return (
					<span className='inline-block rounded bg-native px-1.5 py-0.5 text-xs capitalize text-muted-foreground'>
						{row.getValue('filedIn')}
					</span>
				);
			},
		},
		{
			accessorKey: 'assignedTo',
			meta: {
				title: 'Assigned To',
			},
			header: 'Assigned To',
			cell: ({ row }) => {
				if (!row.getValue('assignedTo')) {
					return <p className='line-clamp-3 text-muted-foreground/50'>None</p>;
				}
				return <p className='line-clamp-3 text-muted-foreground'>{row.getValue('assignedTo')}</p>;
			},
		},
	];
};

type Meta = { title: string };

export function FeedbackTable() {
	const params = useParams();
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
		select: false,
	});
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 5,
	});
	const [rowSelection, setRowSelection] = React.useState({});
	const router = useRouter();

	const baseUrl = `/console/p/${params.project}/feedback`;

	const table = useReactTable({
		data,
		columns: columns(baseUrl),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onPaginationChange: setPagination,
		defaultColumn: {
			size: 0,
			minSize: 20,
			maxSize: 300,
		},
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			pagination,
		},
	});

	return (
		<div className='w-full'>
			<div className='flex items-center gap-4 px-4 py-4'>
				<Input
					placeholder='Filter titles...'
					value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
					onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
					className='max-w-sm'
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline'>
							Columns <ChevronDown className='ml-2 h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className='capitalize'
										checked={column.getIsVisible()}
										onCheckedChange={(value) => column.toggleVisibility(!!value)}
									>
										{(column.columnDef?.meta as Meta)?.title ?? column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className='border-y'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									className='group hover:bg-accent/20'
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											onClick={() => {
												if (cell.column.id === 'select') return;
												router.push(`${baseUrl}/${row.original.id}`);
											}}
											className={cn(cell.column.id !== 'select' && 'cursor-pointer')}
										>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex items-center justify-end space-x-2 px-4 py-4'>
				<div className='flex-1 text-sm text-muted-foreground'>
					{table.getFilteredSelectedRowModel().rows.length === 0 ? null : (
						<>
							{table.getFilteredSelectedRowModel().rows.length} of{' '}
							{table.getFilteredRowModel().rows.length} row(s) selected.
						</>
					)}
				</div>
				<div className='flex items-center gap-2'>
					<div className='text-sm text-muted-foreground'>
						Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
					</div>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
