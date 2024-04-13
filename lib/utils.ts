import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { customAlphabet } from 'nanoid';
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
