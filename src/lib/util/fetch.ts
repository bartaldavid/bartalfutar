import { json, type RequestHandler } from '@sveltejs/kit';
import { createFetch } from 'ofetch';

export const useOfetch = (customFetch = fetch) => createFetch({ fetch: customFetch });

export interface TypedResponse<T = unknown> extends Response {
  json(): Promise<T>;
}

export function typed_json<T>(x: T) {
  return json(x) as TypedResponse<T>;
}

// TypedResponse<T> -> T
export type GetResponseType<R> = Awaited<R> extends TypedResponse<infer T> ? T : never;

// infer type of endpoint function, not working
export type GetEndpointType<S extends RequestHandler> = GetResponseType<ReturnType<S>>;
