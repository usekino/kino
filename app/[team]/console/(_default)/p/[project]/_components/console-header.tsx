// This is the THE ONE
import type { ConsoleHeaderNavProps } from './console-header-nav';

import { ChevronRight, LucideIcon } from 'lucide-react';

import { Heading } from '@/components/heading';
import { cn } from '@/lib/utils';

import { ConsoleHeaderNav } from './console-header-nav';

type ConsoleHeaderProps = {
	icon: LucideIcon;
	title: string;
	breadcrumbs?: string[];
	navProps: ConsoleHeaderNavProps | null;
};

export const ConsoleHeader = async ({
	title,
	breadcrumbs,
	icon: Icon,
	navProps,
}: ConsoleHeaderProps) => {
	const hasBreadcrumbs = !!breadcrumbs && breadcrumbs?.length > 0;

	return (
		<div className='border-b bg-muted'>
			<div className='container flex flex-col gap-4'>
				<div className={cn('flex w-full items-center gap-4 pt-12', !navProps && 'pb-4')}>
					<Icon size={22} className='max-[350px]:hidden' />
					<Heading tag='h1' variant='h3' className='flex items-center gap-2 font-bold'>
						<span className={hasBreadcrumbs ? 'opacity-50' : ''}>{title}</span>
						{hasBreadcrumbs
							? breadcrumbs.map((crumb) => {
									return (
										<>
											<ChevronRight size={16} />
											<span>{crumb}</span>
										</>
									);
								})
							: null}
					</Heading>
				</div>
				{navProps?.links ? <ConsoleHeaderNav {...navProps} /> : null}
			</div>
		</div>
	);
};
