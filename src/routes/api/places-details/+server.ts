import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Client } from '@googlemaps/google-maps-services-js';
import { GOOGLE_MAPS_API_KEY } from '$env/static/private';

export const GET: RequestHandler = async ({ url }) => {
  const place_id = url.searchParams.get('place_id');

  if (typeof place_id !== 'string')
    return json({ error: 'Invalid query' }, { status: 400 });

  const client = new Client();

  const res = await client.placeDetails({
    params: {
      place_id,
      key: GOOGLE_MAPS_API_KEY,
    },
  });

  return json({
    location: res.data.result.geometry?.location,
    address: res.data.result.formatted_address,
    vicinity: res.data.result.vicinity,
  });
};
