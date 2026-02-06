import { env } from '../env/client';

export function getBaseUrl(withProtocol: boolean | undefined = true) {
	if (typeof window !== 'undefined') return '';

	if (!!env.NEXT_PUBLIC_ROOT_DOMAIN) {
		const getProtocol = () => {
			if (!withProtocol) return '';
			return 'http://';
		};
		return `${getProtocol()}${env.NEXT_PUBLIC_ROOT_DOMAIN}`;
	}

	if (!!env.VERCEL_URL) {
		return `${withProtocol ?? 'https://'}${env.VERCEL_URL}`;
	}

	return `${withProtocol ?? 'http://'}localhost:${process.env?.PORT ?? 3000}`;
}

// export function getBaseUrl() {
// 	if (typeof window !== 'undefined') {
// 		// browser should use relative path
// 		return '';
// 	}
// 	if (process.env.VERCEL_URL) {
// 		// reference for vercel.com
// 		return `https://${process.env.VERCEL_URL}`;
// 	}
// 	if (process.env.RENDER_INTERNAL_HOSTNAME) {
// 		// reference for render.com
// 		return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
// 	}

// 	if (process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
// 		return `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
// 	}
// 	// assume localhost
// 	return `http://localhost:${process.env.PORT ?? 3000}`;
// }
