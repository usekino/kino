import type { ReactNode } from "react";

export default async function DomainPage({
	children,
}: {
	children: ReactNode;
}) {
	return <div>{children}</div>;
}
