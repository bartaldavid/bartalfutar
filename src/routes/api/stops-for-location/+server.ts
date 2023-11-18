import { futarClient } from '$lib/server/futar.js';
import type { TStop } from '$lib/types';
import { typed_json, type TypedResponse } from '$lib/util/fetch.js';
import { z } from 'zod';
import { getQueryFromParams } from '../endpoint-types.js';

export const _params = z.object({
  q: z.string(),
  lat: z.number().optional(),
  lon: z.number().optional(),
  radius: z.number().optional()
});

export async function GET({ url, fetch }): Promise<TypedResponse<TStop[]>> {
  const query = _params.parse(getQueryFromParams(url.searchParams));

  if (query.q === '' || query.q.length < 4) return typed_json([]);

  const api = futarClient(fetch);
  const { data } = await api.get('/{dialect}/api/where/stops-for-location', {
    query: {
      query: query.q
    }
  });

  console.log(data?.references);

  const stops: TStop[] =
    data?.list?.map((stop) => ({
      id: stop.id ?? 'No stop id',
      name: stop.name ?? 'No stop name',
      direction: stop.direction,
      routes: stop.routeIds?.map((routeId) => ({
        text: data.references?.routes?.[routeId]?.shortName,
        color: data.references?.routes?.[routeId]?.color,
        textColor: data.references?.routes?.[routeId]?.textColor
      })),
      locationType: stop.locationType
    })) ?? [];

  return typed_json(stops);
}
