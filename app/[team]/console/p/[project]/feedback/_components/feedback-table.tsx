'use client';

import type { SelectUserSchema } from '@/lib/db/tables/lucia/users.table';
import type { API } from '@/lib/trpc/routers/_app';
import type { ArraySingle } from '@/lib/types';
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

type Feedback = NonNullable<ArraySingle<API['output']['feedback']['findByProject']>>;

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
				const status = row.getValue('status') as NonNullable<Feedback>['status'];

				const getStatusClass = (status: string) => {
					switch (status) {
						case 'open':
							return 'bg-green-700/50 text-green-100';
						case 'planned':
							return 'bg-blue-700/50 text-blue-100';
						case 'closed':
							return 'bg-red-700/50 text-red-100';
						default:
							return 'bg-green-700/50 text-green-100';
					}
				};

				return (
					<span
						className={cn(
							getStatusClass(status[0]),
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
						href={`${baseUrl}/${row.original?.id}`}
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
			accessorKey: 'votes',
			meta: {
				title: 'Votes',
			},
			header: ({ column }) => {
				return (
					<button
						className='text-left hocus:text-native-foreground hocus:underline'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Votes
					</button>
				);
			},
			cell: ({ row }) => {
				return (
					<div className='inline-flex size-8 items-center justify-center rounded-lg bg-native p-1 text-xs text-muted-foreground'>
						{row.getValue('votes')}
					</div>
				);
			},
		},
		{
			accessorKey: 'boardId',
			meta: {
				title: 'Board',
			},
			header: 'Board',
			cell: ({ row }) => {
				if (!row.getValue('boardId')) return null;
				return (
					<div className='inline-flex size-8 items-center justify-center rounded-lg bg-native p-1 text-xs text-muted-foreground'>
						{row.getValue('boardId')}
					</div>
				);
			},
		},
		{
			accessorKey: 'userAssigned',
			meta: {
				title: 'Assigned To',
			},
			header: 'Assigned To',
			cell: ({ row }) => {
				const userAssigned = row.getValue('userAssigned') as SelectUserSchema | null;

				if (!userAssigned) {
					return <p className='line-clamp-3 text-muted-foreground/50'>None</p>;
				}
				return (
					<p className='line-clamp-3 text-muted-foreground'>
						{userAssigned.username.toLowerCase()}
					</p>
				);
			},
		},
	];
};

export function FeedbackTable({ feedback }: { feedback: Feedback[] }) {
	const params = useParams();
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
		select: false,
	});
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const [rowSelection, setRowSelection] = React.useState({});
	const router = useRouter();

	const baseUrl = `/console/p/${params.project}/feedback`;

	const table = useReactTable({
		columns: columns(baseUrl),
		data: feedback,
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

	if (!feedback) {
		return <div>No feedback found</div>;
	}

	return (
		<div className='flex h-full w-full flex-col'>
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
										{(column.columnDef?.meta as { title: string })?.title ?? column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className='h-full border-y'>
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
												router.push(`${baseUrl}/${row.original?.id}`);
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
			<div className='mt-auto flex items-center justify-end space-x-2 px-4 py-4'>
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
