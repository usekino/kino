import { procedure, router } from '@/lib/trpc/trpc';

export const computersRouter = router({
	getComputers: procedure.query(async () => {
		return [
			{ id: 1, name: 'Apple I' },
			{ id: 2, name: 'Apple II' },
			{ id: 3, name: 'Macintosh' },
		];
	}),
});
