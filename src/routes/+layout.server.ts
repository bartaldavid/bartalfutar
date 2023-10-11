import { sql } from '$lib/server/db';
import type { LayoutServerLoad } from './$types';
// import { goto } from '$app/navigation';

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await locals.getSession();

  const [result] = await sql<{ favorite_stops: string[] }[]>`
    select
      array_agg(stops.stop_id) as favorite_stops
    from
      stops
    join favorite_stops on stops.stop_id = favorite_stops.stop_id`;
  // join favorite_stops on stops.stop_id = favorite_stops.stop_id`;
  // where favorite_stops.user_id = ${userId}`;

  return {
    session,
    favorite_stops_ids: result?.favorite_stops ?? []
  };
};
