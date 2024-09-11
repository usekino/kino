import { isAuthed } from './middleware/is-authed';
import { consoleAuthPlugin } from './plugins/console-auth-plugin';
import { t } from './trpc';

const { isTeamMember } = consoleAuthPlugin();

export const noAuthProcedure = t.procedure;
export const authProcedure = t.procedure.use(isAuthed);
export const consoleProcedure = t.procedure.unstable_concat(isTeamMember);
