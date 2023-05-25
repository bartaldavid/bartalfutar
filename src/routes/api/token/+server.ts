import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { auth } from '../../../util/firebase-server';
import { dev } from '$app/environment';
import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

const WEEK_IN_SECONDS = 60 * 60 * 24 * 7;
const WEEK_IN_MILLISECONDS = WEEK_IN_SECONDS * 1000;

export const POST = (async ({ request, cookies }) => {
	const payload = await request.json();
	const { token } = payload || '';
	if (token) {
		const user = await auth.verifyIdToken(token);
		const sessionCookie = await auth.createSessionCookie(token, {
			expiresIn: WEEK_IN_MILLISECONDS
		});
		cookies.set('token', sessionCookie, {
			path: '/',
			httpOnly: true,
			maxAge: WEEK_IN_SECONDS,
			secure: !dev
		});
		return json(getSession(user));
	} else {
		cookies.delete('token', { path: '/' });
		return json({ user: null });
	}
}) satisfies RequestHandler;

function getSession(user: DecodedIdToken | null) {
	if (user) {
		const { name, email, email_verified, uid } = user;
		return { user: { name, email: email, email_verified: email_verified, uid } };
	}
	return { user };
}
