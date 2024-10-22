import { Client } from '@googlemaps/google-maps-services-js';
import type { PageServerLoad } from './$types';
import { GOOGLE_MAPS_API_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ url }) => {
  const to_place_id = url.searchParams.get('to_place_id');

  if (to_place_id) {
    const client = new Client();
    const res = await client.placeDetails({
      params: {
        place_id: to_place_id,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    const newUrl = url;

    newUrl.searchParams.delete('to_place_id');

    if (res.data.result.name)
      newUrl.searchParams.set('to_address', res.data.result.name);

    if (res.data.result.geometry?.location)
      newUrl.searchParams.set(
        'to',
        `${res.data.result.geometry.location.lat},${res.data.result.geometry.location.lng}`,
      );

    redirect(303, newUrl);
  }

  const to_address = url.searchParams.get('to_address');
  const to = url.searchParams.get('to');

  return { to_address, to };
}) satisfies PageServerLoad;
