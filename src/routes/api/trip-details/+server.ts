import type { TripDetails } from '$lib/types.js';
import { typed_json, type TypedResponse } from '$lib/util/fetch.js';
import { z } from 'zod';
import { getQueryFromParams } from '../endpoint-types.js';
import type { MavTrainDetails } from './mav-details-spec.js';
import { futarClient } from '$lib/server/futar.js';

export const _params = z.object({
  tripId: z.string(),
});

export async function GET({ fetch, url }): Promise<TypedResponse<TripDetails>> {
  const query = _params.parse(getQueryFromParams(url.searchParams));

  if (!query.tripId.startsWith('BKK_')) {
    const response = await fetchMav(
      { trainId: parseInt(query.tripId), minCount: 0, maxCount: 30 },
      fetch,
    );

    const details: TripDetails =
      response.trainSchedulerDetails[0].scheduler.map((stop) => {
        return {
          id: stop.station.code,
          stopName: stop.station.name,
          relevantStopTime:
            Date.parse(
              stop.actualOrEstimatedStart ??
                stop.actualOrEstimatedArrive ??
                stop.start ??
                stop.arrive ??
                '',
            ) / 1000,
        };
      });

    return typed_json(details);
  }

  // FIXME this is not working
  const { data: response } = await futarClient.GET(
    '/{dialect}/api/where/trip-details',
    {
      params: {
        query,
        path: {
          dialect: 'otp',
        },
      },
    },
  );

  const data = response?.data;

  const details: TripDetails =
    data?.entry?.stopTimes?.map((stop) => {
      if (!stop.stopId) return { id: '' };
      return {
        id: stop.stopId,
        stopName: data.references?.stops?.[stop.stopId]?.name,
        relevantStopTime:
          stop.predictedDepartureTime ??
          stop.predictedArrivalTime ??
          stop.departureTime ??
          stop.arrivalTime ??
          undefined,
      };
    }) ?? [];

  return typed_json(details);
}

async function fetchMav(
  {
    trainId,
    trainNumber,
    minCount,
    maxCount,
  }: {
    trainId: number;
    trainNumber?: string;
    minCount: number;
    maxCount: number;
  },
  fetch = window.fetch,
) {
  return (await fetch(
    'https://jegy-a.mav.hu/IK_API_PROD/api/InformationApi/GetTimetable',
    {
      body: JSON.stringify({
        type: 'TrainInfo',
        travelDate: new Date().toISOString(),
        trainId,
        trainNumber,
        minCount: minCount.toString(),
        maxCount: maxCount.toString(),
      }),
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        language: 'hu',
        UserSessionId: crypto.randomUUID(),
      },
    },
  ).then((res) => res.json())) as MavTrainDetails;
}
