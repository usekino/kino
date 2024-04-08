import { customAlphabet } from "nanoid";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "./env/client";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export function getBaseUrl({
	withProtocol = true,
}: {
	withProtocol?: boolean;
}) {
	if (typeof window !== "undefined") return "";

	if (!!env.NEXT_PUBLIC_ROOT_DOMAIN) {
		const getProtocol = () => {
			if (!withProtocol) return "";
			if (env.NODE_ENV === "development") {
				return "http://";
			} else {
				return "https://";
			}
		};
		return `${getProtocol()}${env.NEXT_PUBLIC_ROOT_DOMAIN}`;
	}

	if (!!env.VERCEL_URL) {
		return `${withProtocol ?? "https://"}${env.VERCEL_URL}`;
	}

	return `${withProtocol ?? "http://"}localhost:${env.PORT ?? 3000}`;
}
