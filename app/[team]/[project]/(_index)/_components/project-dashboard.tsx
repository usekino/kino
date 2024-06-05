import { Info, ThumbsUp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ProjectDashboard() {
	return (
		<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
			<Card>
				<CardHeader className='flex items-center justify-between'>
					<CardTitle>Feedback Statistics</CardTitle>
					<Info className='h-5 w-5 text-gray-500 dark:text-gray-400' />
				</CardHeader>
				<CardContent className='grid grid-cols-2 gap-6'>
					<div className='flex flex-col items-start gap-2'>
						<div className='text-2xl font-bold'>1,234</div>
						<p className='text-sm text-gray-500 dark:text-gray-400'>Total Feedback</p>
					</div>
					<div className='flex flex-col items-start gap-2'>
						<div className='text-2xl font-bold'>4.7</div>
						<p className='text-sm text-gray-500 dark:text-gray-400'>Avg. Sentiment Score</p>
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className='flex items-center justify-between'>
					<CardTitle>Analytics</CardTitle>
					<Info className='h-5 w-5 text-gray-500 dark:text-gray-400' />
				</CardHeader>
				<CardContent className='grid grid-cols-2 gap-6'>
					<div className='flex flex-col items-start gap-2'>
						<div className='text-2xl font-bold'>78%</div>
						<p className='text-sm text-gray-500 dark:text-gray-400'>Feedback Responded To</p>
					</div>
					<div className='flex flex-col items-start gap-2'>
						<div className='text-2xl font-bold'>92%</div>
						<p className='text-sm text-gray-500 dark:text-gray-400'>Customer Satisfaction</p>
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className='flex items-center justify-between'>
					<CardTitle>Roadmap Votes</CardTitle>
					<Info className='h-5 w-5 text-gray-500 dark:text-gray-400' />
				</CardHeader>
				<CardContent className='grid grid-cols-2 gap-6'>
					<div className='flex flex-col items-start gap-2'>
						<div className='text-2xl font-bold'>67%</div>
						<p className='text-sm text-gray-500 dark:text-gray-400'>Users Voted</p>
					</div>
					<div className='flex flex-col items-start gap-2'>
						<div className='text-2xl font-bold'>3</div>
						<p className='text-sm text-gray-500 dark:text-gray-400'>Top Feature Requests</p>
					</div>
				</CardContent>
			</Card>
			<Card className='col-span-1 md:col-span-2 lg:col-span-3'>
				<CardHeader className='flex items-center justify-between'>
					<CardTitle>Roadmap</CardTitle>
					<Info className='h-5 w-5 text-gray-500 dark:text-gray-400' />
				</CardHeader>
				<CardContent>
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
						<div className='rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800'>
							<h3 className='text-lg font-bold'>Dark Mode</h3>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								Implement a dark mode theme for better visibility.
							</p>
							<div className='mt-4 flex items-center justify-between'>
								<div className='flex items-center gap-2'>
									<ThumbsUp className='h-5 w-5 text-gray-500 dark:text-gray-400' />
									<span className='text-sm'>1,234</span>
								</div>
								<Badge>In Progress</Badge>
							</div>
						</div>
						<div className='rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800'>
							<h3 className='text-lg font-bold'>Analytics Dashboard</h3>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								Provide detailed analytics and reporting.
							</p>
							<div className='mt-4 flex items-center justify-between'>
								<div className='flex items-center gap-2'>
									<ThumbsUp className='h-5 w-5 text-gray-500 dark:text-gray-400' />
									<span className='text-sm'>987</span>
								</div>
								<Badge variant='secondary'>Planned</Badge>
							</div>
						</div>
						<div className='rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800'>
							<h3 className='text-lg font-bold'>Mobile App</h3>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								Develop a mobile app for on-the-go access.
							</p>
							<div className='mt-4 flex items-center justify-between'>
								<div className='flex items-center gap-2'>
									<ThumbsUp className='h-5 w-5 text-gray-500 dark:text-gray-400' />
									<span className='text-sm'>789</span>
								</div>
								<Badge variant='secondary'>Planned</Badge>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
