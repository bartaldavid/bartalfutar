import { removeStopFromDb, saveStopToDb } from '$lib/server/utils';
import { fail } from '@sveltejs/kit';
import { typed_fetch } from '../api/endpoint-types.js';
import type { TStop } from '$lib/types.js';
import { db } from '$lib/server/libsql-db.js';
import { eq } from 'drizzle-orm';
import { favoriteStops, stops } from '$lib/server/libsql-schema.js';

// TODO stream references?
export async function load({ fetch, url, locals }) {
  const query = url.searchParams.get('q')?.toString() ?? '';
  const userId = (await locals.auth())?.user.id;

  if (query !== '') {
    const data = await typed_fetch(
      '/api/stops-for-location',
      { q: query },
      fetch,
    );

    return {
      searchData: data,
      query,
    };
  } else if (userId) {
    const favorite_stops_query = db.query.favoriteStops.findMany({
      with: {
        stop: {
          columns: {
            id: true,
            name: true,
            type: true,
            locationType: true,
            direction: true,
          },
          with: {
            stopsRoutes: {
              with: {
                route: true,
              },
            },
          },
        },
      },
      columns: {},
      where: eq(favoriteStops.userId, userId),
    });

    console.log(favorite_stops_query.toSQL());

    const start = performance.now();
    const favorite_stops = await favorite_stops_query;
    console.log('Query time:', performance.now() - start);
    return {
      searchData: favorite_stops.flatMap(
        (stop) =>
          ({
            id: stop.stop.id,
            name: stop.stop.name ?? 'No stop name',
            direction: stop.stop.direction,
            routes: stop.stop.stopsRoutes.map((stopRoute) => ({
              text: stopRoute.route?.shortName,
              color: stopRoute.route?.style?.color,
              textColor: stopRoute.route?.style?.icon?.textColor,
            })),
            locationType: stop.stop.locationType,
          }) as TStop,
      ),
      query: '',
      favorites_ids: favorite_stops.map((stop) => stop.stop.id),
    };
  } else {
    return {
      searchData: null,
      query: '',
    };
  }
}

export const actions = {
  default: async ({ request, fetch, locals }) => {
    const session = await locals.auth();
    const data = await request.formData();
    const stopId = data.get('stopId');

    if (!session || typeof stopId !== 'string') {
      return fail(400);
    }

    const saved = data.get('saved') === 'true';

    if (!saved) {
      const result = await saveStopToDb({ stopId, session, fetch });
      if (result.error) {
        return fail(404, { message: result.error });
      }
      return result;
    }

    return await removeStopFromDb({ stopId, session });
  },
};
