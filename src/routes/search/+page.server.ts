import { favoriteStops, routes, stops, stopsRoutes } from '$lib/server/libsql-schema.js';
import { removeStopFromDb, saveStopToDb } from '$lib/server/utils';
import { fail } from '@sveltejs/kit';
import { eq, sql } from 'drizzle-orm';
import { typed_fetch } from '../api/endpoint-types.js';
import type { TStop } from '$lib/types.js';
import { db } from '$lib/server/libsql-db.js';

// TODO stream references?
export async function load({ fetch, url, locals }) {
  const query = url.searchParams.get('q')?.toString() ?? '';
  const userId = (await locals.auth())?.user.id;

  if (query !== '') {
    const data = await typed_fetch('/api/stops-for-location', { q: query }, fetch);

    return {
      searchData: data,
      query
    };
  } else if (userId) {
    const { routes, favorite_stops } = await fetchFavoritesAndRoutes(userId);

    return {
      searchData: favorite_stops.map(
        (stop) =>
          ({
            id: stop.id,
            name: stop.name ?? 'No stop name',
            direction: stop.direction,
            routes: stop.routeIds?.map((routeId) => ({
              text: routes.find((route) => route.id === routeId)?.shortName,
              color: routes.find((route) => route.id === routeId)?.style?.color,
              textColor: routes.find((route) => route.id === routeId)?.style?.icon?.textColor
            })),
            locationType: stop.locationType
          }) as TStop
      ),
      query: '',
      favorites_ids: favorite_stops.map((stop) => stop.id)
    };
  } else {
    return {
      searchData: null,
      query: ''
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
      console.log(result);
      if (result.error) {
        return fail(404, { message: result.error });
      }
      return result;
    }

    return await removeStopFromDb({ stopId, session });
  }
};

async function fetchFavoritesAndRoutes(userId: string) {
  const now = performance.now();
  const result = await db.transaction(async (trx) => {
    const favorite_stops_query = await trx
      .select({
        id: stops.id,
        name: stops.name,
        type: stops.type,
        locationType: stops.locationType,
        direction: stops.direction,
        routeIds: sql<string[]>`json_group_array(${stopsRoutes.routeId})`
      })
      .from(stops)
      .innerJoin(favoriteStops, eq(stops.id, favoriteStops.stopId))
      .innerJoin(stopsRoutes, eq(stopsRoutes.stopId, stops.id))
      .where(eq(favoriteStops.userId, userId))
      .groupBy(stops.id, stops.name, stops.type, stops.locationType, stops.direction);

    const routes_query = await trx
      .select({
        id: routes.id,
        shortName: routes.shortName,
        style: routes.style
      })
      .from(routes)
      .innerJoin(stopsRoutes, eq(stopsRoutes.routeId, routes.id))
      .innerJoin(favoriteStops, eq(stopsRoutes.stopId, favoriteStops.stopId))
      .where(eq(favoriteStops.userId, userId));
    return { favorite_stops: favorite_stops_query, routes: routes_query };
  });
  const end = performance.now();
  console.log(`Query took ${end - now}ms`);
  return result;
}
