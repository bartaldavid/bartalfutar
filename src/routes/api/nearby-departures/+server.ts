import { futarClient } from '$lib/server/futar';
import type { DepartureGroup } from '$lib/types.js';
import { typed_json, type TypedResponse } from '$lib/util/fetch.js';
import { z } from 'zod';

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
  const query = _params.parse({
    stopIds: url.searchParams.get('stopId')?.split(',') ?? [],
    limit: Number(url.searchParams.get('limit')) ?? undefined,
    minutesBefore: Number(url.searchParams.get('minutesBefore')) ?? undefined,
    minutesAfter: Number(url.searchParams.get('minutesAfter')) ?? undefined,
    lon: Number(url.searchParams.get('lon')) ?? undefined,
    lat: Number(url.searchParams.get('lat')) ?? undefined,
    radius: Number(url.searchParams.get('radius')) ?? undefined
  });

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
