'use client';

import type { LinkData, UseLinksProps, UseLinksReturn } from '@/lib/utils/use-links';

import { useLinks } from '@/lib/utils/use-links';

export const Links = <T extends LinkData>({
	links,
	base,
	render,
}: UseLinksProps<T> & {
	render: (state: {
		link: UseLinksReturn<T>['links'][0];
		isActive: boolean;
		current: UseLinksReturn<T>['current'];
	}) => React.ReactNode;
}) => {
	const { links: _links, isActive, current } = useLinks<T>({ base, links });

	if (!render) {
		return null;
	}

	return links.map((link) => {
		return render({
			link,
			isActive: isActive(link),
			current,
		});
	});
};
