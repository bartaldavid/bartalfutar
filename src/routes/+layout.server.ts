import { decodeToken, getUserData } from '../util/firebase-server';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const decodedToken = await decodeToken(cookies.get('token') || '');

	if (!decodedToken) return { stops: [], uid: null };

	const stops = await getUserData(decodedToken.uid);
	return { stops, uid: decodedToken.uid };
};
