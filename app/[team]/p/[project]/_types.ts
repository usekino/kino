import type { PropsWithChildren } from 'react';
import type { PageProps as ParentPageProps } from '../../_types';

export type PageProps = ParentPageProps & {
	params: Promise<{
		project: string;
	}>;
};

export type LayoutProps = PropsWithChildren<PageProps>;
