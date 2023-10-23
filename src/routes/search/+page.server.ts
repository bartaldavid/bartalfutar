import { stopsForLocationUrl } from '$lib/data/api-links.js';
import type { components } from '$lib/data/bkk-openapi';
import {
  favoriteStopsTable,
  transitRoutesTable,
  transitStopsTable
} from '$lib/schemas/user-data.js';
import { db, sql } from '$lib/server/db.js';
import { arrayContains, eq } from 'drizzle-orm';

export async function load({ fetch, url }) {
  const query = url.searchParams.get('q')?.toString();
  // const userId = (await locals.getSession())?.user.id;

  if (!query || query.length < 3) {
    const now = performance.now();

    const favorite_stops_query = db
      .select({
        id: transitStopsTable.id,
        name: transitStopsTable.name,
        type: transitStopsTable.type,
        locationType: transitStopsTable.locationType,
        direction: transitStopsTable.direction,
        routeIds: transitStopsTable.routeIds
      })
      .from(transitStopsTable)
      .innerJoin(favoriteStopsTable, eq(transitStopsTable.id, favoriteStopsTable.stopId))
      .where(eq(favoriteStopsTable.userId, 'userId'))
      .toSQL().sql;
    const routes_query = db
      .select({
        id: transitRoutesTable.id,
        shortName: transitRoutesTable.shortName,
        style: transitRoutesTable.style
      })
      .from(transitRoutesTable)
      .innerJoin(
        transitStopsTable,
        arrayContains(transitStopsTable.routeIds, transitRoutesTable.id)
      )
      .innerJoin(favoriteStopsTable, eq(transitStopsTable.id, favoriteStopsTable.stopId))
      .where(eq(favoriteStopsTable.userId, 'userId'))
      .toSQL().sql;

    const result = await sql.transaction([sql`select 1 as num`, sql`select 2 as num`]);

    console.log(result);

    const end = performance.now();
    console.log(`Query took ${end - now}ms`);

    return {
      searchData: {
        data: {
          list: []
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
