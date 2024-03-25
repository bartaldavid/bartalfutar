import { db } from '$lib/server/libsql-db.js';
import { favoriteStops } from '$lib/server/libsql-schema.js';
import { eq } from 'drizzle-orm';

export async function load({ locals }) {
  const session = await locals.auth();

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
