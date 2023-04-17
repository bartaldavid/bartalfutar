const firebaseConfig = {
	apiKey: 'AIzaSyD4remIrEwAp6iri5_uKQHmumgCsNoJJ8I',
	authDomain: 'bkk-svelte.firebaseapp.com',
	projectId: 'bkk-svelte',
	storageBucket: 'bkk-svelte.appspot.com',
	messagingSenderId: '656596007531',
	appId: '1:656596007531:web:0460358bb0a3897c168f2e',
	measurementId: 'G-LV290MDXS8'
};

import { browser } from '$app/environment';
// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	linkWithCredential,
	onAuthStateChanged,
	signInWithPopup,
	type Auth,
	type Unsubscribe
} from 'firebase/auth';
import { Firestore, initializeFirestore, persistentLocalCache } from 'firebase/firestore';
import { stopsRef, user, savedStops } from './stores';
import type { savedStop } from './savedStop';
import { get } from 'svelte/store';

export let app: FirebaseApp;
export let db: Firestore;
export let auth: Auth;

async function setToken(token: string) {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ token })
	};
	await fetch('/api/token', options);
}

function listenToAuth() {
	auth = getAuth(app);
	let unsubData: Unsubscribe;

	onAuthStateChanged(
		auth,
		async (currentUser) => {
			console.log('Auth state changed!', currentUser?.uid);
			if (currentUser) {
				user.set(currentUser);
				await setToken(await currentUser.getIdToken());
				const { onSnapshot, collection, query } = await import('firebase/firestore');
				stopsRef.set(collection(db, `userdata/${currentUser.uid}/stops`));

				const q = query(get(stopsRef));
				unsubData = onSnapshot(q, (snap) => {
					const stops: savedStop[] = [];
					snap.forEach((doc) => stops.push(doc.data()));
					savedStops.set(stops);
					// const source = snap.metadata.fromCache ? 'local cache' : 'server';
					// console.log('Data came from ' + source);
				});
			} else {
				unsubData && unsubData();
				await setToken('');
			}
		},
		(err) => {
			console.error(err);
		}
	);
}

export async function initializeFirebase() {
	if (!browser) throw new Error('Not in browser');
	if (!app) {
		// Initialize Firebase
		app = initializeApp(firebaseConfig);
		console.log('firebase initialized');
		db = initializeFirestore(app, {
			localCache: persistentLocalCache({})
		});
		listenToAuth();
	}
}

export async function elevateAnonToGoogle() {
	if (!auth) throw new Error('Auth is not defined');
	const provider = new GoogleAuthProvider();
	await signInWithPopup(auth, provider);
	// const credential = GoogleAuthProvider.credentialFromResult(result);
	// if (get(user) !== null && credential) {
	// 	linkWithCredential(get(user)!, credential)
	// 		.then(() => console.log('Elevation success'))
	// 		.catch((error) => console.log('Failure', error));
	// }
}
