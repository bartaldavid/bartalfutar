import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { serverAuth } from '../../../lib/server/firebase-admin';

const WEEK_IN_SECONDS = 60 * 60 * 24 * 7;
const WEEK_IN_MILLISECONDS = WEEK_IN_SECONDS * 1000;

export const POST = (async ({ request, cookies }) => {
  const token = request.headers.get('Authorization')?.split('Bearer ')?.[1];
  if (token) {
    const decodedIdToken = await serverAuth.verifyIdToken(token);
    const sessionCookie = await serverAuth.createSessionCookie(token, {
      expiresIn: WEEK_IN_MILLISECONDS
    });
    cookies.set('__session', sessionCookie, {
      path: '/',
      httpOnly: true,
      maxAge: WEEK_IN_SECONDS,
      secure: !dev
    });
    return json(decodedIdToken.uid);
  } else {
    cookies.delete('__session', { path: '/' });
    return json('');
  }
}) satisfies RequestHandler;

export const DELETE = (async ({ cookies }) => {
  cookies.delete('__session', { path: '/' });
  return json({ status: 'signedOut' });
}) satisfies RequestHandler;
