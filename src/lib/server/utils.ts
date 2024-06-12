import type { Session } from '@auth/sveltekit';
import { db } from './libsql-db';
import { favoriteStops, routes, stops, stopsRoutes } from './libsql-schema';
import { and, eq } from 'drizzle-orm';
import { futarClient } from './futar';
import type { components } from '$lib/schema-generated';

export async function saveStopToDb({
  stopId,
  session,
  fetch
}: {
  stopId: string;
  session: Session;
  fetch: typeof window.fetch;
}) {
  const userId = session.user.id;

  // FIXME type this correctly
  const { data: FIXME_type } = await futarClient.GET('/{dialect}/api/where/references', {
    params: { query: { stopId: [stopId] }, path: { dialect: 'otp' } },
    fetch
  });

  // @ts-expect-error bad types in openapi
  const data = FIXME_type.data as components['schemas']['ReferencesMethodResponse'];

  const stopRef = data?.references?.stops?.[stopId];
  const routeRefs = data?.references?.routes;

  if (!data?.references || !stopRef || !routeRefs || !stopRef.id) {
    return { error: 'Invalid API response', success: false, stopId };
  }

  const { routeIds: _, ...restStop } = stopRef;
  const stopRow = { id: stopId, ...restStop };
  const routeRows = Object.entries(routeRefs).map(([routeId, data]) => ({
    id: routeId,
    ...data
  }));
  const stopRoutesRows = stopRef?.routeIds?.map((routeId) => ({ stopId, routeId })) ?? [];

  // const now = performance.now();
  // TODO replace with CTE?
  await db.transaction(async (tx) => {
    await tx.insert(stops).values(stopRow).onConflictDoNothing();
    if (routeRows.length > 0) {
      await tx.insert(routes).values(routeRows).onConflictDoNothing();
      await tx.insert(stopsRoutes).values(stopRoutesRows).onConflictDoNothing();
    }
    await tx.insert(favoriteStops).values({ stopId, userId });
  });

  // const end = performance.now();
  // console.log(`Transaction took ${end - now}ms`);

  return { success: true, stopId, error: null };
}

// TODO error handling?
export async function removeStopFromDb({ stopId, session }: { stopId: string; session: Session }) {
  const userId = session.user.id;

  await db
    .delete(favoriteStops)
    .where(and(eq(favoriteStops.stopId, stopId), eq(favoriteStops.userId, userId)));
}
