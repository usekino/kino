import { UpdatesHeader } from './_components/updates-header';

export default async function UpdatesLayoutPage({ children }: { children: React.ReactNode }) {
	return (
		<>
			<UpdatesHeader />
			{children}
		</>
	);
}
