import type { Option } from '@/components/ui/multi-selector';

import { Label } from '@/components/ui/label';
import MultipleSelector from '@/components/ui/multi-selector';

export const InviteMembers = () => {
	const OPTIONS: Option[] = [
		{ label: 'nextjs', value: 'nextjs' },
		{ label: 'React', value: 'react' },
		{ label: 'Remix', value: 'remix' },
		{ label: 'Vite', value: 'vite' },
		{ label: 'Nuxt', value: 'nuxt' },
		{ label: 'Vue', value: 'vue' },
		{ label: 'Svelte', value: 'svelte' },
		{ label: 'Angular', value: 'angular' },
		{ label: 'Ember', value: 'ember', disable: true },
		{ label: 'Gatsby', value: 'gatsby', disable: true },
		{ label: 'Astro', value: 'astro' },
	];

	const mockSearch = async (value: string): Promise<Option[]> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const res = OPTIONS.filter((option) => option.value.includes(value));
				resolve(res);
			}, 1000);
		});
	};

	return (
		<>
			<Label htmlFor='search'>Search and invite members (coming soon)</Label>
			<MultipleSelector
				disabled={true}
				onSearch={async (value) => {
					const res = await mockSearch(value);
					return res;
				}}
				placeholder='Type to search members'
				loadingIndicator={
					<p className='py-2 text-center text-lg leading-10 text-muted-foreground'>loading...</p>
				}
				emptyIndicator={
					<p className='w-full text-center text-lg leading-10 text-muted-foreground'>
						no results found.
					</p>
				}
			/>
		</>
	);
};
