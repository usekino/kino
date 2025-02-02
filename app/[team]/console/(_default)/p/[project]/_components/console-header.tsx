import type { LucideIcon } from 'lucide-react';
import type { ConsoleHeaderNavProps } from './console-header-nav';

import { ChevronRight } from 'lucide-react';

import { Heading } from '@/components/heading';
import { cn, slugify } from '@/lib/utils';

import { ConsoleHeaderNav } from './console-header-nav';

// This is the THE ONE

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
										<span key={slugify(crumb)} className='inline-flex items-center gap-2'>
											<ChevronRight size={16} />
											<span>{crumb}</span>
										</span>
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
