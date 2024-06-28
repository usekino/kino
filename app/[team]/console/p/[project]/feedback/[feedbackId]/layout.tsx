import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// import {
// 	Breadcrumb,
// 	BreadcrumbItem,
// 	BreadcrumbLink,
// 	BreadcrumbList,
// 	BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';

import { PageParams } from './_types';

export default async function FeedbackIdLayoutPage({ params, children }: PageParams) {
	return (
		<div>
			<div className='border-b px-6 py-4'>
				<Link
					className='flex items-center gap-2 hocus:underline'
					href={`/console/p/${params.project}/feedback`}
				>
					<ArrowLeft size={16} />
					<span>Back to all</span>
				</Link>
				{/* <Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link className='hocus:underline' href={`/console/p/${params.project}/feedback`}>
									Feedback
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>Item '{params.feedbackId}'</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb> */}
			</div>
			{children}
		</div>
	);
}
