export const splitPathAfterProject = (path: string): string | null => {
	const regex = /\/p\/.*\/(.*)/;
	const match = path.match(regex);
	return match && match[1] ? match[1] : '';
};
