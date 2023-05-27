import admin from 'firebase-admin';
import { FIREBASE_SERVICE_ACCOUNT_KEY } from '$env/static/private';

const serviceAccount: admin.ServiceAccount = JSON.parse(FIREBASE_SERVICE_ACCOUNT_KEY);

function initializeFirebase() {
	if (admin.apps.length) return admin.app();

	return admin.initializeApp({
		credential: admin.credential.cert(serviceAccount)
	});
}

export async function decodeSessionCookie(sessionCookie: string) {
	if (!sessionCookie) return null;
	try {
		return await admin.auth().verifySessionCookie(sessionCookie);
	} catch (err) {
		console.log(err);
		return null;
	}
}

export const app = initializeFirebase();
export const serverAuth = app.auth();
