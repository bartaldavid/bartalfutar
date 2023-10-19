import { PUBLIC_BKK_API_KEY } from '$env/static/public';
import type { components } from '$lib/data/bkk-openapi.js';
import { favoriteStops, routes, stops } from '$lib/schemas/user-data.js';
import { db } from '$lib/server/db.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, fetch, locals }) {
  const userId = (await locals.getSession())?.user.id;

  if (!userId) {
    // FIXME maybe do anonymous login here
    return json({ error: 'Not logged in' }, { status: 401 });
  }

  const { stopId } = await request.json();

  const { data }: { data: components['schemas']['ReferencesMethodResponse'] } = await (
    await fetch(
      `https://futar.bkk.hu/api/query/v1/ws/otp/api/where/references?key=${PUBLIC_BKK_API_KEY}&stopId=${stopId}&version=4`
    )
  ).json();

  const stopData = data.references?.stops?.[stopId];
  const routeRef = data.references?.routes;

  if (!stopData || !routeRef) return json({ error: 'No stop found' }, { status: 404 });

  const response = await db.transaction(async (tx) => {
    await tx.insert(stops).values({ id: 'stopId' }).execute();
    await tx.insert(routes).values({ id: 'routeId' }).execute();
    await tx
      .insert(favoriteStops)
      .values({ stopId: 'stopId', userId: 'userId', id: 'id' })
      .execute();
  });

  return json({
    stopId,
    response
  });
}
