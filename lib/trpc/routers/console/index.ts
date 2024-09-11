import { router } from '@/lib/trpc/trpc';

import { consoleFeedbackRouter } from './console-feedback.router';

export const consoleRouter = router({
	feedback: consoleFeedbackRouter,
});
