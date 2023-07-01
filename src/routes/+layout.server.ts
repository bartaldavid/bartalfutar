import { adminDB, serverAuth } from '../lib/server/firebase-admin';
import type { savedStop } from '../util/client/savedStop';

import type { LayoutServerLoad } from './$types';

type serverData =
	| {
			status: 'signedIn';
			stops: savedStop[];
			uid: string;
			name?: string;
			isAnonymous: boolean;
	  }
	| { status: 'signedOut' };

export const load: LayoutServerLoad = async ({ locals }): Promise<serverData> => {
	const userId = locals.userId;

	if (!userId) return { status: 'signedOut' };

	const querySnapshot = await adminDB.collection(`userdata/${userId}/stops`).get();
	const stops = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
	const user = await serverAuth.getUser(userId);

	return {
		status: 'signedIn',
		stops,
		uid: userId,
		name: user.displayName,
		isAnonymous: !user.email
	};
};
