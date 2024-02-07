import { json } from '@sveltejs/kit';
import { Client } from '@googlemaps/google-maps-services-js';
import { GOOGLE_MAPS_API_KEY } from '$env/static/private';
import { PlaceAutocompleteType } from '@googlemaps/google-maps-services-js';

export async function GET({ url }) {
  const query = url.searchParams.get('query');

  if (typeof query !== 'string') return json({ error: 'Invalid query' }, { status: 400 });

  const client = new Client();
  const res = await client.placeAutocomplete({
    params: {
      input: query,
      key: GOOGLE_MAPS_API_KEY,
      types: PlaceAutocompleteType.geocode,
      components: ['country:hu']
    }
  });

  return json({ a: res.data.predictions.map((p) => p.structured_formatting) });
}
