import { sql } from '$lib/server/db.js';

export async function load({ locals }) {
  const session = await locals.getSession();
  const userId = session?.user.id;

  if (!userId) {
    return { stops: [] };
  }

  const stops = await sql`
    SELECT 
      stops.stop_id stopId, 
      type, 
      stops.name, 
      route_ids routeIds
    FROM stops
    JOIN favorite_stops ON stops.stop_id = favorite_stops.stop_id
    WHERE favorite_stops.user_id = ${userId}`;

  console.log(stops, userId);
  return { stops };
}
