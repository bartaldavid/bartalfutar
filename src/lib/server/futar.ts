import { BKK_API_KEY } from '$env/static/private';
import type { paths } from '$lib/schema-generated';
import createClient, { type Middleware } from 'openapi-fetch';

export const futarClient = createClient<paths>({
  baseUrl: 'https://futar.bkk.hu/api/query/v1/ws'
});

const futarAuth = {
  async onRequest(req, options) {
    const url = new URL(req.url);
    url.searchParams.set('key', BKK_API_KEY);
    // console.log(url);
    return new Request(url.toString(), req);
  }
} satisfies Middleware;

futarClient.use(futarAuth);
