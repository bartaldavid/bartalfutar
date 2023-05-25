import { error, type RequestHandler } from '@sveltejs/kit';
import { decodeSessionCookie, getUserData } from '../../../util/firebase-server';

export const GET = (async ({ cookies }) => {
	const decodedToken = await decodeSessionCookie(cookies.get('token') || '');

	if (!decodedToken) throw error(401, "You're not logged in");

	const stops = await getUserData(decodedToken.uid);

	return new Response(JSON.stringify(stops));
}) satisfies RequestHandler;
