import { futarClient } from '$lib/server/futar.js';
import type { DepartureType } from '$lib/types.js';
import { typed_json, type TypedResponse } from '$lib/util/fetch.js';
import { z } from 'zod';

export const _params = z.object({
  stopId: z.array(z.string()),
  limit: z.number().optional(),
  minutesBefore: z.number().optional(),
  minutesAfter: z.number().optional()
});

export async function GET({
  fetch,
  url
}): Promise<
  TypedResponse<{ departures: DepartureType[]; stops: { id: string; name?: string }[] }>
> {
  const query = _params.parse({
    stopId: url.searchParams.get('stopId')?.split(',') ?? []
    // limit: Number(url.searchParams.get('limit')) ?? undefined,
    // minutesBefore: Number(url.searchParams.get('minutesBefore')) ?? undefined,
    // minutesAfter: Number(url.searchParams.get('minutesAfter')) ?? undefined
  });

  const api = futarClient(fetch);

  const { data } = await api.get('/{dialect}/api/where/arrivals-and-departures-for-stop', {
    query
  });

  const departures: DepartureType[] =
    data?.entry?.stopTimes?.map((departure) => {
      // FIXME these early returns are kind of vulnerable
      if (!departure.tripId) return { id: '' };
      const routeId = data.references?.trips?.[departure.tripId]?.routeId;
      if (!routeId) return { id: '' };
      return {
        id: departure.tripId,
        arrivalTime: departure.arrivalTime,
        departureTime: departure.departureTime,
        predictedArrivalTime: departure.predictedArrivalTime,
        predictedDepartureTime: departure.predictedDepartureTime,
        headSign: departure.stopHeadsign,
        alerts: departure.alertIds?.map(
          // TODO alerts could be translated into EN / HU
          (alertId) => data.references?.alerts?.[alertId].description?.someTranslation ?? ''
        ),
        icon: {
          color: data.references?.routes?.[routeId]?.color,
          text: data.references?.routes?.[routeId]?.shortName,
          textColor: data.references?.routes?.[routeId]?.textColor
        }
      };
    }) ?? [];

  const stops = query.stopId.map((id) => ({ id, name: data?.references?.stops?.[id]?.name }));

  return typed_json({
    departures,
    stops
  });
}
