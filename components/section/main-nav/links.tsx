import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { env } from '@/lib/env/server';
import { cn } from '@/lib/utils';

export function Links({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
	return (
		<nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
			<a
				href={`https://acme.${env.NEXT_PUBLIC_ROOT_DOMAIN}`}
				className='inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary hover:underline'
			>
				Go to public view
				<ExternalLink size={16} />
			</a>
		</nav>
	);
}
