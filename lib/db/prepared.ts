import { cache } from 'react';
import { sql } from 'drizzle-orm';

import { db } from '.';
import { createTruthyObject } from '../utils';
import { readTeamSchema } from '../validation/team-validation';

const P_GetTeamData = db.query.teams
	.findFirst({
		columns: createTruthyObject(readTeamSchema.shape),
		where: (team, { eq }) => eq(team.slug, sql.placeholder('slug')),
	})
	.prepare('P_GetTeamData');

export const getTeamData = cache(async (slug: string) => {
	const team = await P_GetTeamData.execute({ slug });
	return team ? readTeamSchema.parseAsync(team) : null;
});
