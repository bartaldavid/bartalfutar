import { json } from '@sveltejs/kit';
import { fetchMav } from '../mav.js';

export async function GET({ url, fetch }) {
  const stationId = url.searchParams.get('stationId');

  if (!stationId) return json({ message: 'No stationId provided' });

  const data = await fetchMav(
    { stationId: stationId.split('_')[1].replace('CS', ''), minCount: 0, maxCount: 10 },
    fetch
  );

  const response = data.stationSchedulerDetails.departureScheduler.map((departure) => {
    return {
      id: departure.code,
      actualDeparture: departure.actualOrEstimatedStart,
      actualArrival: departure.actualOrEstimatedArrive,
      info: departure.havarianInfok.kesesInfo,
      delay: departure.havarianInfok.aktualisKeses,
      headsign: departure.endStation.name
    };
  });

  console.log(response);

  return json({ message: 'Success!' });
}
