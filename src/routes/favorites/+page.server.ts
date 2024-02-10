import { db } from '$lib/server/db.js';
import { favoriteStops, stops } from '$lib/server/schema';
import type { StopGroup as StopGroups } from '$lib/types.js';
import { eq } from 'drizzle-orm';

export async function load({ locals }) {
  const session = await locals.auth();
  const userId = session?.user.id;

  if (!userId) {
    return { stops: {} as StopGroups, session: null };
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

  const groups: StopGroups = result.reduce((result, currentStop) => {
    if (currentStop.type) {
      (result[currentStop.type] = result[currentStop.type] || []).push({
        id: currentStop.id,
        name: currentStop.name ?? ''
      });
    } else if (currentStop.locationType === 1) {
      (result['MULTIPLE'] = result['MULTIPLE'] || []).push({
        id: currentStop.id,
        name: currentStop.name ?? ''
      });
    }
    return result;
  }, {} as StopGroups);

  return { stops: groups, session };
}
