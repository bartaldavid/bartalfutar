import firebaseAdmin from 'firebase-admin';
import type { savedStop } from './client/savedStop';
import credentials from '../bkk-svelte-firebase-adminsdk-xxnoc-8b0332b820.json';

function initializeFirebase() {
	if (firebaseAdmin.apps.length) return;

	firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert(credentials as firebaseAdmin.ServiceAccount)
	});
}

export async function decodeToken(token: string) {
	if (!token) return null;
	try {
		initializeFirebase();
		return await firebaseAdmin.auth().verifyIdToken(token);
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
