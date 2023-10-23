import { PUBLIC_BKK_API_KEY } from '$env/static/public';
import type { components } from '$lib/data/bkk-openapi.js';
import { favoriteStops, routes, stops, stopsRoutes } from '$lib/server/schema.js';
import { db } from '$lib/server/db.js';
import { json } from '@sveltejs/kit';
import { and, eq, sql } from 'drizzle-orm';

export async function POST({ request, fetch, locals }) {
  const userId = (await locals.getSession())?.user.id;

  if (!userId) {
    // TODO maybe do anonymous login here
    return json({ error: 'Not logged in' }, { status: 401 });
  }

  const { stopId } = await request.json();

  if (!stopId || typeof stopId !== 'string')
    return json({ error: 'Invalid stopId' }, { status: 400 });

  const now = performance.now();

  const { data }: { data: components['schemas']['ReferencesMethodResponse'] } = await (
    await fetch(
      `https://futar.bkk.hu/api/query/v1/ws/otp/api/where/references?key=${PUBLIC_BKK_API_KEY}&stopId=${stopId}&version=4`
    )
  ).json();

  const stopRef = data.references?.stops?.[stopId];
  const routeRefs = data.references?.routes;

  if (!data.references || !stopRef || !routeRefs || !stopRef.id) {
    return json({ error: 'Invalid API response' }, { status: 400 });
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

  // TODO replace with CTE
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
    await tx.insert(favoriteStops).values({ stopId, userId });
  });

  const end = performance.now();
  console.log(`Transaction took ${end - now}ms`);

  // FIXME return SUCCESS here if the transaction was successful or error if it wasnt
  return json({
    stopId
  });
}

export async function DELETE({ request, locals }) {
  const session = await locals.getSession();
  const userId = session?.user.id;

  if (!userId) {
    return json({ success: false, error: 'Not logged in' }, { status: 401 });
  }

  const { stopId } = await request.json();

  if (!stopId || typeof stopId !== 'string')
    return json({ success: false, error: 'Invalid stopId' }, { status: 400 });

  await db
    .delete(favoriteStops)
    .where(and(eq(favoriteStops.stopId, stopId), eq(favoriteStops.userId, userId)));

  return json({ success: true, error: null }, { status: 200 });
}
