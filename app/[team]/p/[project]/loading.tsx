import { Skeleton } from '@/components/ui/skeleton';

export default async function LoadingProjectPage() {
	return (
		<div className='flex h-screen w-full flex-col justify-start gap-2 py-6'>
			<div className='container flex flex-col gap-4'>
				<Skeleton className='h-[100px] w-full rounded-xl opacity-20' />
				<Skeleton className='h-[100px] w-full rounded-xl opacity-20' />
				<Skeleton className='h-[100px] w-full rounded-xl opacity-20' />
			</div>
		</div>
	);
}
