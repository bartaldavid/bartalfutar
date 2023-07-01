import admin from 'firebase-admin';
import { FIREBASE_SERVICE_ACCOUNT_KEY } from '$env/static/private';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount: admin.ServiceAccount = JSON.parse(FIREBASE_SERVICE_ACCOUNT_KEY);

function initializeFirebase() {
	if (admin.apps.length) return admin.app();

	return admin.initializeApp({
		credential: admin.credential.cert(serviceAccount)
	});
}

export const app = initializeFirebase();
export const serverAuth = getAuth();
export const adminDB = getFirestore();
