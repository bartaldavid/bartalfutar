import { futarClient } from '$lib/server/futar.js';
import type { Stop } from '$lib/types';
import { typed_json, type TypedResponse } from '$lib/util/fetch.js';
import { z } from 'zod';

export const _params = z.object({
  q: z.string(),
  lat: z.number().optional(),
  lon: z.number().optional(),
  radius: z.number().optional()
});

export async function GET({ url, fetch }): Promise<TypedResponse<Stop[]>> {
  const api = futarClient(fetch);

  const query = _params.parse({
    q: url.searchParams.get('q')?.toString() ?? '',
    lat: Number(url.searchParams.get('lat')) ?? undefined,
    lon: Number(url.searchParams.get('lon')) ?? undefined,
    radius: Number(url.searchParams.get('radius')) ?? undefined
  });

  const { data } = await api.get('/{dialect}/api/where/stops-for-location', { query });

  const stops: Stop[] =
    data?.list?.map((stop) => ({
      id: stop.id ?? 'No stop id',
      name: stop.name ?? 'No stop name',
      direction: stop.direction,
      routes: stop.routeIds?.map((routeId) => ({
        shortName: data.references?.routes?.[routeId]?.shortName,
        color: data.references?.routes?.[routeId]?.color,
        textColor: data.references?.routes?.[routeId]?.textColor
      })),
      locationType: stop.locationType
    })) ?? [];

  return typed_json(stops);
}
