import { db } from '$lib/server/db';
import { favoriteStops } from '$lib/server/schema.js';
import { removeStopFromDb, saveStopToDb } from '$lib/server/utils';
import { error } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export async function load({ params, locals }) {
  const session = await locals.getSession();

  if (!session) {
    return { stopId: params.stopId, saved: false };
  }

  const response = await db
    .select({ id: favoriteStops.stopId })
    .from(favoriteStops)
    .where(and(eq(favoriteStops.userId, session.user.id), eq(favoriteStops.stopId, params.stopId)))
    .execute();

  return {
    stopId: params.stopId,
    saved: response.length > 0
  };
}

export const actions = {
  default: async ({ params, locals, fetch, request }) => {
    const session = await locals.getSession();
    const data = await request.formData();
    const stopId = params.stopId;

    if (!session) {
      return error(401, 'Not logged in');
    }

    const saved = data.get('saved') === 'true';

    if (!saved) {
      return await saveStopToDb({ stopId, session, fetch });
    }

    return await removeStopFromDb({ stopId, session });
  }
};
