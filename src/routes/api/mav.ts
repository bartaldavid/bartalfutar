import type { MavRoot } from '$lib/data/mav-spec';

export async function fetchMav(
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
      minCount,
      maxCount
    }),
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      language: 'hu'
    }
  }).then((res) => res.json())) as MavRoot;
}
