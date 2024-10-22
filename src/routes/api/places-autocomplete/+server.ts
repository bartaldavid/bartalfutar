import { json } from '@sveltejs/kit';
import { Client } from '@googlemaps/google-maps-services-js';
import { GOOGLE_MAPS_API_KEY } from '$env/static/private';
import { PlaceAutocompleteType } from '@googlemaps/google-maps-services-js';

export async function GET({ url }) {
  const query = url.searchParams.get('q');

  if (typeof query !== 'string')
    return json({ error: 'Invalid query' }, { status: 400 });

  const client = new Client();
  const res = await client.placeAutocomplete({
    params: {
      input: query,
      key: GOOGLE_MAPS_API_KEY,
      types: PlaceAutocompleteType.geocode,
      components: ['country:hu'],
      // TODO set language
      // language: locals.paraglide.lang
    },
  });

  return json(
    res.data.predictions.map((p) => {
      return {
        main: p.structured_formatting.main_text,
        secondary: p.structured_formatting.secondary_text,
        placeId: p.place_id,
      };
    }),
  );
}
