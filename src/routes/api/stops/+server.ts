import { PUBLIC_BKK_API_KEY } from '$env/static/public';
import type { components } from '$lib/data/bkk-openapi.js';
import { saveStopToSupabase } from '$lib/server/supabase/setup.js';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals, fetch }) {
  const { stopId } = await request.json();
  const userId = locals.userId;
  const { data }: { data: components['schemas']['ReferencesMethodResponse'] } = await (
    await fetch(
      `https://futar.bkk.hu/api/query/v1/ws/otp/api/where/references?key=${PUBLIC_BKK_API_KEY}&stopId=${stopId}&version=4`
    )
  ).json();

  const stopData = data.references?.stops?.[stopId];
  const routeRef = data.references?.routes;
  const response = await saveStopToSupabase({ ...stopData, routeRef });
  return json({
    stopId,
    userId,
    stopData,
    routeRef,
    response
  });
}
