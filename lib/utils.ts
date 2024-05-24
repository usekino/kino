import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { customAlphabet } from 'nanoid';
import { alphabet, generateRandomString } from 'oslo/crypto';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789');

export const getInitials = (name: string): string => {
	const words = name.split(' ');

	const initials = words
		.map((word) => {
			const firstLetter = word.charAt(0);
			return firstLetter.toUpperCase();
		})
		.splice(0, 2);
	return initials.join('') || name.charAt(0).toUpperCase();
};

export const createTruthyObject = <T extends object>(schema: T): { [K in keyof T]: true } => {
	return Object.fromEntries(
		Object.keys(schema).map((key): [keyof T, true] => [key as keyof T, true])
	) as { [K in keyof T]: true };
};

export function slugify(str: string) {
	return String(str)
		.normalize('NFKD') // split accented characters into their base characters and diacritical marks
		.replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
		.trim() // trim leading or trailing whitespace
		.toLowerCase() // convert to lowercase
		.replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
		.replace(/\s+/g, '-') // replace spaces with hyphens
		.replace(/-+/g, '-'); // remove consecutive hyphens
}

export const generateId = ({ prefix }: { prefix?: string }) => {
	return `${prefix + `_` || ''}${generateRandomString(15, alphabet('a-z', 'A-Z', '0-9'))}`;
};
