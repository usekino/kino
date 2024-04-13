import { fileURLToPath } from 'node:url';

import createJiti from 'jiti';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./lib/env/server');
jiti('./lib/env/client');

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.externals.push('@node-rs/argon2', '@node-rs/bcrypt');
		if (process.env.NODE_ENV === 'development') {
			config.devServer = {
				allowedHosts: 'all',
				client: {
					webSocketURL: 'auto://0.0.0.0:0/ws',
				},
			};
		}
		return config;
	},
	redirects: async () => {
		return [
			{
				source: '/sign-out',
				destination: '/api/sign-out',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
