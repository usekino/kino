import type { PageParams as ParentPageParams } from '../../_types';

export type PageParams = ParentPageParams & {
	params: {
		feedbackId: string;
	};
};
