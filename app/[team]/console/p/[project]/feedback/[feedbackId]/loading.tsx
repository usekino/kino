import { Skeleton } from '@/components/ui/skeleton';

export default async function LoadingFeedbackIdPage() {
	return (
		<div className='overflow-hidden p-4'>
			<div className='flex flex-col gap-4'>
				<Skeleton className='h-[200px] w-full rounded-xl opacity-20' />
				<Skeleton className='h-[200px] w-full rounded-xl opacity-20' />
			</div>
		</div>
	);
}
