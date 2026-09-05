import { paraglideMiddleware } from '$lib/paraglide/server';
import { getTextDirection } from '$lib/paraglide/runtime';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handle as authHandle } from './auth';

// creating a handle to use the paraglide middleware
const paraglideHandle: Handle = ({ event, resolve }) =>
  paraglideMiddleware(
    event.request,
    ({ request: localizedRequest, locale }) => {
      event.request = localizedRequest;
      return resolve(event, {
        transformPageChunk: ({ html }) => {
          return html
            .replace('%lang%', locale)
            .replace('%dir%', getTextDirection(locale));
        },
      });
    },
  );

export const handle = sequence(paraglideHandle, authHandle);
