import type { paths } from '$lib/schema-generated';
import createClient from 'openapi-fetch';

export const futarClient2 = createClient<paths>({
  baseUrl: 'https://futar.bkk.hu/api/query/v1/ws'
});
