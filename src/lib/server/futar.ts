import { BKK_API_KEY } from '$env/static/private';
import type { paths } from '$lib/schema-generated';
import createClient, { type Middleware } from 'openapi-fetch';

export const futarClient = createClient<paths>({
  baseUrl: 'https://futar.bkk.hu/api/query/v1/ws',
});

const futarAuth: Middleware = {
  async onRequest({ request }) {
    const url = new URL(request.url);
    url.searchParams.set('key', BKK_API_KEY);
    return new Request(url.toString(), request);
  },
};

futarClient.use(futarAuth);
