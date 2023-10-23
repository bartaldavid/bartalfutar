import { favoriteStopsTable, transitStopsTable } from '$lib/schemas/user-data.js';
import { db } from '$lib/server/db.js';
import { eq } from 'drizzle-orm';

export async function load({ parent }) {
  const { session } = await parent();
  const userId = session?.user.id;

  if (!userId) {
    return { stops: [] };
  }

  const result = await db
    .select({
      id: transitStopsTable.id,
      type: transitStopsTable.type,
      name: transitStopsTable.name,
      locationType: transitStopsTable.locationType
    })
    .from(transitStopsTable)
    .innerJoin(favoriteStopsTable, eq(transitStopsTable.id, favoriteStopsTable.stopId))
    .where(eq(favoriteStopsTable.userId, userId))
    .execute();

  return { stops: result };
}
