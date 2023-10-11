import { stopsForLocationUrl } from '$lib/data/api-links.js';
import type { components } from '$lib/data/bkk-openapi';
import { sql } from '$lib/server/db';

export async function load({ fetch, url }) {
  const query = url.searchParams.get('q')?.toString();
  // const userId = (await locals.getSession())?.user.id;

  if (!query || query.length < 3) {
    const now = performance.now();
    const { favorite_stops, routes } = await sql.begin(async (sql) => {
      const favorite_stops = await sql<
        {
          id: string;
          name: string;
          type: string;
          locationType: number;
          direction: string;
          routeIds: string[];
        }[]
      >`
        select
          stops.stop_id as id,
          stops.name,
          stops.type,
          stops.location_type as "locationType",
          stops.direction,
          stops.route_ids as "routeIds"
        from
          stops
        join favorite_stops on stops.stop_id = favorite_stops.stop_id`;
      // where favorite_stops.user_id = ${userId}`;

      const [routes] = await sql<
        {
          routes: {
            [key: string]: {
              id: string;
              shortName?: string;
              style?: components['schemas']['TransitRouteStyle'];
            };
          };
        }[]
      >`
        SELECT
          JSONB_OBJECT_AGG(
          transit_routes.id,
          JSONB_BUILD_OBJECT(
            'shortName',
            transit_routes.short_name,
            'style',
            transit_routes.style
          )
        ) as routes
        FROM
            transit_routes
        JOIN stops ON stops.route_ids @> ARRAY[transit_routes.id]
        JOIN favorite_stops ON stops.stop_id = favorite_stops.stop_id`;
      // WHERE favorite_stops.user_id = ${userId}`;
      return { favorite_stops, routes };
    });

    const end = performance.now();
    console.log(`Query took ${end - now}ms`);

    return {
      searchData: {
        data: {
          list: favorite_stops,
          references: { routes: routes.routes }
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
