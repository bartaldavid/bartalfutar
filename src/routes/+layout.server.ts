import { db } from '$lib/server/db';
import { favoriteStops } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export async function load({ locals }) {
  console.log('load layout');

  const session = await locals.getSession();

  if (!session) return { favorite_stops: [] };

  const response = await db
    .select({ id: favoriteStops.stopId })
    .from(favoriteStops)
    .where(eq(favoriteStops.userId, session.user.id))
    .execute();

  return {
    favorite_stops: response.map((stop) => stop.id)
  };
}
