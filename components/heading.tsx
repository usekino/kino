import type { ClassValue } from 'clsx';

import { cn } from '@/lib/utils';

type Props = {
	children: React.ReactNode;
	tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'div';
	className?: ClassValue;
	variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

const variants = {
	h1: 'scroll-m-20 text-4xl font-medium tracking-tight lg:text-5xl"',
	h2: 'scroll-m-20 text-3xl font-medium tracking-tight first:mt-0',
	h3: 'scroll-m-20 text-2xl font-medium tracking-tight first:mt-0',
	h4: 'scroll-m-20 text-xl font-medium tracking-tight',
	h5: 'scroll-m-20 text-lg font-medium tracking-tight',
	h6: 'scroll-m-20 text-sm font-medium tracking-tight uppercase',
	span: '',
	p: '',
	div: '',
};

const getVariant = (variant: Props['variant'] | Props['tag']) => {
	return variant ? variants[variant] : null;
};

export function Heading({ tag, children, className, variant }: Props) {
	const Tag = tag;
	const classNames = cn('font-semibold', getVariant(variant ?? tag), className);
	return <Tag className={classNames}>{children}</Tag>;
}
