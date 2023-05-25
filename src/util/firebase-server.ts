import firebaseAdmin from 'firebase-admin';
import type { savedStop } from './client/savedStop';
import { FIREBASE_SERVICE_ACCOUNT_KEY } from '$env/static/private';

const serviceAccount: firebaseAdmin.ServiceAccount = JSON.parse(FIREBASE_SERVICE_ACCOUNT_KEY);

function initializeFirebase() {
	if (firebaseAdmin.apps.length) return firebaseAdmin.app();

	return firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert(serviceAccount)
	});
}

export async function decodeSessionCookie(sessionCookie: string) {
	if (!sessionCookie) return null;
	try {
		initializeFirebase();
		return await firebaseAdmin.auth().verifySessionCookie(sessionCookie);
	} catch (err) {
		console.log(err);
		return null;
	}
}

export async function getUserData(uid: string): Promise<savedStop[]> {
	if (!uid) return [];
	try {
		initializeFirebase();
		const db = firebaseAdmin.firestore();
		const querySnapshot = await db.collection(`userdata/${uid}/stops`).get();
		const stops = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
		return stops;
	} catch (err) {
		console.log(err);
		return [];
	}
}

export const app = initializeFirebase();
export const auth = app.auth();
