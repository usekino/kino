import { usePathname } from 'next/navigation';

export type LinkData = {
	href: string;
	title: string;
};

export type UseLinksProps<T extends LinkData = LinkData> = {
	base: string;
	links: T[];
};

export const useLinks = <T extends LinkData>({ base, links: _links }: UseLinksProps<T>) => {
	const pathname = usePathname();

	const links = _links?.map((link) => ({
		...link,
		href: `${base}${link.href}`,
	}));

	const current = links?.find((link) => {
		const pName = pathname.replace(base, '');
		const p = link.href.replace(base, '');
		const current = (!p || p == '') && pName !== p ? false : pName.startsWith(p);
		return current;
	});

	const isActive = (link: T) => {
		return link.href === current?.href;
	};

	return {
		links,
		current,
		isActive,
	};
};

export type UseLinksReturn<T extends LinkData> = {
	links: T[];
	current: T | undefined;
	isActive: (link: T) => boolean;
};
