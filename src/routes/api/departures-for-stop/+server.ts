import { futarClient } from '$lib/server/futar.js';
import type { DepartureType } from '$lib/types.js';
import { typed_json, type TypedResponse } from '$lib/util/fetch.js';
import { z } from 'zod';
import { getQueryFromParams } from '../endpoint-types.js';
import type { MavRoot } from '$lib/data/mav-spec.js';
import { isMav } from '$lib/util/stops.js';

export const _params = z.object({
  stopId: z.array(z.string()),
  limit: z.number().optional(),
  minutesBefore: z.number().optional(),
  minutesAfter: z.number().optional()
});

export async function GET({ fetch, url }): Promise<
  TypedResponse<{
    departures: DepartureType[];
    stops: { id: string; name?: string }[];
    source: string;
  }>
> {
  const query = _params.parse(getQueryFromParams(url.searchParams));

  if (isMav(query.stopId[0])) {
    const data = await fetchMav(
      {
        stationId: query.stopId[0].split('_')[1].replace('CS', ''),
        minCount: 0,
        maxCount: query.limit ?? 10
      },
      fetch
    );

    // console.log(data);

    const departures: DepartureType[] = data.stationSchedulerDetails.departureScheduler.map(
      (departure) => {
        return {
          id: departure.trainId,
          ...(departure.actualOrEstimatedStart && {
            predictedDepartureTime: Date.parse(departure.actualOrEstimatedStart) / 1000
          }),
          ...(departure.actualOrEstimatedArrive && {
            predictedArrivalTime: Date.parse(departure.actualOrEstimatedArrive) / 1000
          }),
          arrivalTime: departure.arrive ? Date.parse(departure.arrive) / 1000 : Date.now() / 1000,
          departureTime: departure.start ? Date.parse(departure.start) / 1000 : Date.now() / 1000,
          alerts: [departure.havarianInfok.kesesiOk ?? ''],
          headSign: departure.endStation.name,
          icon: {
            text: departure.viszonylatiJel?.jel || departure.fullShortType || departure.name || '',
            color: departure.viszonylatiJel?.fontSzinKod,
            textColor: departure.viszonylatiJel?.hatterSzinKod
          },
          ...(departure.startTrack && { platform: departure.startTrack })
        };
      }
    );

    const stops = [
      {
        id: `BKK_${data.stationSchedulerDetails.station.code}_0`,
        name: data.stationSchedulerDetails.station.name
      }
    ];

    return typed_json({ departures, stops, source: 'MÁV' });
  }

  const api = futarClient(fetch);

  const { data } = await api.get('/{dialect}/api/where/arrivals-and-departures-for-stop', {
    query
  });

  const departures: DepartureType[] =
    data?.entry?.stopTimes?.map((departure) => {
      if (!departure.tripId) return { id: 'No tripId, bad response' };
      const routeId = data.references?.trips?.[departure.tripId]?.routeId;
      if (!routeId) return { id: 'No routeId, bad response' };
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

  const stops = data?.entry?.stopId
    ? [{ id: data.entry.stopId, name: data.references?.stops?.[data.entry.stopId]?.name }]
    : [];

  console.log(stops);

  return typed_json({
    departures,
    stops,
    source: 'BKK'
  });
}

async function fetchMav(
  {
    stationId,
    minCount,
    maxCount
  }: {
    stationId: string;
    minCount: number;
    maxCount: number;
  },
  fetch = window.fetch
) {
  return (await fetch('https://jegy-a.mav.hu/IK_API_PROD/api/InformationApi/GetTimetable', {
    body: JSON.stringify({
      type: 'StationInfo',
      travelDate: new Date().toISOString(),
      stationNumberCode: stationId,
      minCount: minCount.toString(),
      maxCount: maxCount.toString()
    }),
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      language: 'hu',
      UserSessionId: crypto.randomUUID()
    }
  }).then((res) => res.json())) as MavRoot;
}
