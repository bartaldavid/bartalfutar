import { futarClient } from '$lib/server/futar';
import type { DepartureGroup } from '$lib/types.js';
import { typed_json, type TypedResponse } from '$lib/util/fetch.js';
import { z } from 'zod';
import { getQueryFromParams } from '../endpoint-types.js';

export const _params = z.object({
  stopIds: z.array(z.string()).optional(),
  limit: z.number().optional(),
  minutesBefore: z.number().optional(),
  minutesAfter: z.number().optional(),
  lon: z.number().optional(),
  lat: z.number().optional(),
  radius: z.number().optional()
});

export async function GET({ url, fetch }): Promise<TypedResponse<DepartureGroup[]>> {
  const query = _params.parse(getQueryFromParams(url.searchParams));

  const api = futarClient(fetch);

  const { data } = await api.get('/{dialect}/api/where/arrivals-and-departures-for-location', {
    query
  });

  const departureGroups =
    data?.list?.map((group) => {
      if (!group.routeId) return { id: '' };
      return {
        id: group.routeId,
        headSign: group.headsign,
        icon: {
          color: data.references?.routes?.[group.routeId]?.color,
          text: data.references?.routes?.[group.routeId]?.shortName,
          textColor: data.references?.routes?.[group.routeId]?.textColor
        },
        departures: group.stopTimes?.map((departure) => ({
          id: departure.tripId ?? '',
          arrivalTime: departure.arrivalTime,
          departureTime: departure.departureTime,
          predictedArrivalTime: departure.predictedArrivalTime,
          predictedDepartureTime: departure.predictedDepartureTime
        }))
      };
    }) ?? [];

  return typed_json(departureGroups);
}
