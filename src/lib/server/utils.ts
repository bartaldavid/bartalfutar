import type { components } from '$lib/data/bkk-openapi';
import type { Session } from '@auth/core/types';
import { db } from './db';
import { favoriteStops, routes, stops, stopsRoutes } from './schema';
import { and, eq, sql } from 'drizzle-orm';
import { PUBLIC_BKK_API_KEY } from '$env/static/public';

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

  const { data }: { data: components['schemas']['ReferencesMethodResponse'] } = await (
    await fetch(
      `https://futar.bkk.hu/api/query/v1/ws/otp/api/where/references?key=${PUBLIC_BKK_API_KEY}&stopId=${stopId}&version=4`
    )
  ).json();

  const stopRef = data.references?.stops?.[stopId];
  const routeRefs = data.references?.routes;

  if (!data.references || !stopRef || !routeRefs || !stopRef.id) {
    return { error: 'Invalid API response', success: false, stopId };
  }

  // FIXME refractor this
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { routeIds: _, ...restStop } = stopRef;
  const stopRow = { id: stopId, ...restStop };
  const routeRows = Object.entries(routeRefs).map(([routeId, data]) => ({
    id: routeId,
    ...data
  }));
  const stopRoutesRows = stopRef?.routeIds?.map((routeId) => ({ stopId, routeId })) ?? [];

  const now = performance.now();
  // TODO replace with CTE?
  await db.transaction(async (tx) => {
    await tx
      .insert(stops)
      .values(stopRow)
      .onDuplicateKeyUpdate({ set: { id: sql`id` } });
    await tx
      .insert(routes)
      .values(routeRows)
      .onDuplicateKeyUpdate({ set: { id: sql`id` } });
    await tx
      .insert(stopsRoutes)
      .values(stopRoutesRows)
      .onDuplicateKeyUpdate({ set: { stopId: sql`stop_id` } });
    await tx
      .insert(favoriteStops)
      .values({ stopId, userId })
      .onDuplicateKeyUpdate({ set: { stopId: sql`stop_id` } });
  });

  const end = performance.now();
  console.log(`Transaction took ${end - now}ms`);

  return { success: true, stopId, error: null };
}

// TODO error handling?
export async function removeStopFromDb({ stopId, session }: { stopId: string; session: Session }) {
  const userId = session.user.id;

  await db
    .delete(favoriteStops)
    .where(and(eq(favoriteStops.stopId, stopId), eq(favoriteStops.userId, userId)));
}
