import { Skeleton } from '@/components/ui/skeleton';

export const ProjectPageLoading = () => {
	return (
		<div className='p-2 sm:p-4 md:p-6'>
			<div className='flex flex-col gap-4'>
				<Skeleton className='h-[100px] w-full rounded-xl opacity-20' />
				<Skeleton className='h-[100px] w-full rounded-xl opacity-20' />
				<Skeleton className='h-[100px] w-full rounded-xl opacity-20' />
			</div>
		</div>
	);
};
