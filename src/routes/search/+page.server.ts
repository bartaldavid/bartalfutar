import { stopsForLocationUrl } from '$lib/data/api-links.js';
import type { components } from '$lib/data/bkk-openapi';

import { db } from '$lib/server/db.js';
import { favoriteStops, routes, stops, stopsRoutes } from '$lib/server/schema.js';
import { eq } from 'drizzle-orm';

export async function load({ fetch, url, locals }) {
  const query = url.searchParams.get('q')?.toString();
  const userId = (await locals.getSession())?.user.id;

  if ((!query || query.length < 3) && userId) {
    const now = performance.now();

    const result = await db.transaction(async (trx) => {
      const favorite_stops_query = await trx
        .select({
          id: stops.id,
          name: stops.name,
          type: stops.type,
          locationType: stops.locationType,
          direction: stops.direction
        })
        .from(stops)
        .innerJoin(favoriteStops, eq(stops.id, favoriteStops.stopId))
        .where(eq(favoriteStops.userId, userId))
        .execute();

      const routes_query = await trx
        .select({
          id: routes.id,
          shortName: routes.shortName,
          style: routes.style
        })
        .from(routes)
        .innerJoin(stopsRoutes, eq(stopsRoutes.routeId, routes.id))
        .innerJoin(favoriteStops, eq(stopsRoutes.stopId, favoriteStops.stopId))
        .where(eq(favoriteStops.userId, userId))
        .execute();
      return { favorite_stops_query, routes_query };
    });

    console.log(result);

    const end = performance.now();
    console.log(`Query took ${end - now}ms`);

    return {
      searchData: {
        data: {
          list: result.favorite_stops_query,
          references: {
            routes: {}
          }
        }
      } as components['schemas']['StopsForLocationResponse'],
      query
    };
  }

  const data: components['schemas']['StopsForLocationResponse'] = await fetch(
    stopsForLocationUrl({ query })
  ).then((res) => res.json());

  return {
    searchData: data,
    query
  };
}
