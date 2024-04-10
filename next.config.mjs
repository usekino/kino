import { fileURLToPath } from 'node:url';

import createJiti from 'jiti';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./lib/env/server');
jiti('./lib/env/client');

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.externals.push('@node-rs/argon2', '@node-rs/bcrypt');
		return config;
	},
};

export default nextConfig;
