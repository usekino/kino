import type { NextConfig } from 'next';

import './lib/env/server';
import './lib/env/client';

const nextConfig: NextConfig = {
	experimental: {
		reactCompiler: true,
	},
	// reactStrictMode: true,
	// webpack: (config) => {
	// 	config.externals.push('@node-rs/argon2', '@node-rs/bcrypt');
	// 	if (process.env.NODE_ENV === 'development') {
	// 		config.devServer = {
	// 			allowedHosts: 'all',
	// 			client: {
	// 				webSocketURL: 'auto://0.0.0.0:0/ws',
	// 			},
	// 		};
	// 	}
	// 	return config;
	// },
	redirects: async () => {
		return [];
	},
};

export default nextConfig;
