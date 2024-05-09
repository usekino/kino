'use client';

import { useState } from 'react';

import { GlobalSearch } from '.';

export function GlobalSearchToggle() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<button
				onClick={() => setOpen((open) => !open)}
				className='min-w-48x group inline-flex items-stretch justify-between gap-2 rounded-md border bg-background p-1.5 text-sm text-muted-foreground transition-colors hocus:bg-accent/10 hocus:text-accent-foreground dark:hocus:text-accent-foreground'
			>
				<span className='inline-block px-1.5'>Search Kino...</span>
				<span className='inline-flex items-center justify-center rounded bg-accent px-1 text-xs font-medium text-accent-foreground/75 transition-colors group-hover:bg-accent-foreground/10 group-hover:shadow-lg'>
					⌘K
				</span>
			</button>
			<GlobalSearch open={open} setOpen={setOpen} />
		</>
	);
}
