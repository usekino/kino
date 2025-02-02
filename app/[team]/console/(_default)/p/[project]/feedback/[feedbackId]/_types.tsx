import type { PropsWithChildren } from 'react';
import type { PageProps as ParentPageParams } from '../../_types';

export type PageProps = ParentPageParams & {
	params: Promise<{
		feedbackId: string;
	}>;
};

export type LayoutProps = PropsWithChildren<PageProps>;
