import { CircleDot } from 'lucide-react';

import { Heading } from '@/components/heading';

import { LayoutProps } from './_types';

export default async function FeedbackIdLayoutPage({ children }: LayoutProps) {
	return (
		<div>
			<header>
				<div className='border-b bg-muted'>
					<div className='container flex items-start gap-4 px-8 pb-4 pt-12'>
						<div className='mt-1'>
							<CircleDot size={28} />
						</div>
						<div className='flex flex-col gap-2'>
							<Heading tag='h1' variant='h2'>
								This is a feature request
							</Heading>
							<div className='text-sm text-muted-foreground'>
								<span>Open · 12 comments · 45 upvotes · Fresh</span>
							</div>
						</div>
					</div>
				</div>
			</header>
			{children}
		</div>
	);
}
