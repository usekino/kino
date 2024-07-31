import { usePathname } from 'next/navigation';

export type LinkData = {
	href: string;
	title: string;
	group?: string;
};

export type UseLinksProps<B, T extends LinkData = LinkData> = {
	base: B;
	links: T[];
};

export const useLinks = <B extends string, T extends LinkData>({
	base,
	links: _links,
}: UseLinksProps<B, T>) => {
	const pathname = usePathname();

	const current = _links?.find((link) => {
		const pName = pathname.replace(base, '');
		const p = link.href.replace(base, '');
		const current = (!p || p == '') && pName !== p ? false : pName.startsWith(p);
		return current;
	});

	const links = _links?.map((link) => ({
		...link,
		href: `${base}${link.href}`,
		passedHref: link.href,
		active: link.href === current?.href,
	}));

	return {
		links,
		current,
	};
};

export type UseLinksReturn<T extends LinkData> = {
	links: T[];
};
