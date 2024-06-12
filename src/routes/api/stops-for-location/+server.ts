import type { TStop } from '$lib/types';
import { typed_json, type TypedResponse } from '$lib/util/fetch.js';
import { z } from 'zod';
import { getQueryFromParams } from '../endpoint-types.js';
import { futarClient } from '$lib/server/futar.js';

export const _params = z.object({
  q: z.string(),
  lat: z.number().optional(),
  lon: z.number().optional(),
  radius: z.number().optional()
});

export async function GET({ url, fetch }): Promise<TypedResponse<TStop[]>> {
  const query = _params.parse(getQueryFromParams(url.searchParams));

  if (query.q.length < 4) return typed_json([]);

  const { data: response } = await futarClient.GET('/{dialect}/api/where/stops-for-location', {
    params: {
      query: {
        query: query.q
      },
      path: {
        dialect: 'otp'
      }
    }
  });

  const data = response?.data;

  const stops: TStop[] =
    data?.list?.map((stop) => ({
      id: stop.id ?? 'No stop id',
      name: stop.name ?? 'No stop name',
      direction: stop.direction,
      routes: stop.routeIds
        // not working
        ?.sort(
          (a, b) =>
            (data.references?.routes?.[b].sortOrder || 0) -
            (data.references?.routes?.[a].sortOrder || 0)
        )
        .map((routeId) => ({
          text: data.references?.routes?.[routeId]?.shortName,
          color: data.references?.routes?.[routeId]?.color,
          textColor: data.references?.routes?.[routeId]?.textColor
        })),
      locationType: stop.locationType
    })) ?? [];

  return typed_json(stops);
}
