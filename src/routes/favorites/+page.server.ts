import { db } from '$lib/server/db.js';
import { favoriteStops, stops } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export async function load({ locals }) {
  const session = await locals.getSession();
  const userId = session?.user.id;

  if (!userId) {
    return { stops: [], session: null };
  }

  const result = await db
    .select({
      id: stops.id,
      type: stops.type,
      name: stops.name,
      locationType: stops.locationType
    })
    .from(stops)
    .innerJoin(favoriteStops, eq(stops.id, favoriteStops.stopId))
    .where(eq(favoriteStops.userId, userId))
    .execute();

  return { stops: result, session };
}
