import type { savedStop } from '../util/client/savedStop';
import { serverAuth, decodeSessionCookie } from '../util/firebase-server';

import type { LayoutServerLoad } from './$types';
import admin from 'firebase-admin';

type serverData = {
	stops: savedStop[];
	uid: string;
	name?: string;
	isAnonymous: boolean;
};

export const load: LayoutServerLoad = async ({ cookies }): Promise<serverData> => {
	const decodedToken = await decodeSessionCookie(cookies.get('__session') || '');

	if (!decodedToken) return { stops: [], uid: '', name: '', isAnonymous: false };

	const db = admin.firestore();
	const querySnapshot = await db.collection(`userdata/${decodedToken.uid}/stops`).get();
	const stops = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

	const name = (await serverAuth.getUser(decodedToken.uid)).displayName;
	console.log((await serverAuth.getUser(decodedToken.uid)).toJSON());
	return {
		stops,
		uid: decodedToken.uid,
		name,
		isAnonymous: !(await serverAuth.getUser(decodedToken.uid)).email
	};
};
