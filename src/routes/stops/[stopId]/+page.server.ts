import { removeStopFromDb, saveStopToDb } from '$lib/server/utils';
import { error } from '@sveltejs/kit';

export async function load({ params, parent }) {
  const { favorite_stops } = await parent();

  return {
    stopId: params.stopId,
    saved: favorite_stops.includes(params.stopId)
  };
}

export const actions = {
  default: async ({ params, locals, fetch, request }) => {
    const session = await locals.auth();
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
