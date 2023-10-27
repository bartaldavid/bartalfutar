import { stopsForLocationUrl } from '$lib/data/api-links.js';
import type { components } from '$lib/data/bkk-openapi';

import { db } from '$lib/server/db.js';
import { favoriteStops, routes, stops, stopsRoutes } from '$lib/server/schema.js';
import { removeStopFromDb, saveStopToDb } from '$lib/server/utils';
import { eq, sql } from 'drizzle-orm';

export async function load({ fetch, url, locals }) {
  const query = url.searchParams.get('q')?.toString();
  const userId = (await locals.getSession())?.user.id;

  if (query && query !== '') {
    const data: components['schemas']['StopsForLocationResponse'] = await fetch(
      stopsForLocationUrl({ query })
    ).then((res) => res.json());

    return {
      searchData: data,
      query
    };
  } else if (userId) {
    const result = await fetchFavoritesAndRoutes(userId);

    return {
      searchData: {
        data: {
          list: result.favorite_stops_query,
          references: {
            routes: result.routes_query.reduce((acc, route) => ({ [route.id]: route, ...acc }), {})
          }
        }
      } as components['schemas']['StopsForLocationResponse'],
      query: '',
      favorites_ids: result.favorite_stops_query.map((stop) => stop.id)
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
    const session = await locals.getSession();
    const data = await request.formData();
    const stopId = data.get('stopId');

    if (!session || typeof stopId !== 'string') {
      return null;
    }

    const saved = data.get('saved') === 'true';

    if (!saved) {
      return await saveStopToDb({ stopId, session, fetch });
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
        routeIds: sql<string[]>`json_arrayagg(${stopsRoutes.routeId})`
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
    return { favorite_stops_query, routes_query };
  });
  const end = performance.now();
  console.log(`Query took ${end - now}ms`);
  return result;
}