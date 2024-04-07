import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

import { env as shared } from "@/lib/env/shared";

export const env = createEnv({
	extends: [shared],
	server: {
		DATABASE_URL: z.string().url().min(1),
		RESEND_API_KEY: z.string().min(1),
	},
	experimental__runtimeEnv: {},
	isServer: typeof window === "undefined",
});
