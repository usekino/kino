import { createTRPCReact } from '@trpc/react-query';

import { AppRouter } from '@/lib/trpc/routers/_app';

export const api = createTRPCReact<AppRouter>({});
