import type { ReactNode } from "react";

export default async function DomainLayout({
	params,
	children,
}: {
	params: {
		domain: string;
	};
	children: ReactNode;
}) {
	const domain = decodeURIComponent(params.domain);
	return (
		<div>
			<h1>Team: {domain}</h1>
			<div>{children}</div>
		</div>
	);
}
