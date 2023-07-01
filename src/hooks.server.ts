import type { Handle } from '@sveltejs/kit';
import { serverAuth } from './lib/server/firebase-admin';

export const handle = (async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('__session');

	if (!sessionCookie) return resolve(event);

	try {
		const decodedClaims = await serverAuth.verifySessionCookie(sessionCookie);
		event.locals.userId = decodedClaims.uid;
	} catch (error) {
		event.locals.userId = null;
	}

	return resolve(event);
}) satisfies Handle;
