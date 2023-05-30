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
import type { FirebaseApp } from 'firebase/app';
import type { Unsubscribe } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { stopsRef, user, savedStops, userInfo } from './stores';
import type { savedStop } from './savedStop';
import { get } from 'svelte/store';

export let app: FirebaseApp;
export let db: Firestore;
// export let auth: Auth;

async function setToken(token: string) {
	const response = await fetch('/api/token', {
		method: 'POST',
		headers: new Headers({
			Authorization: `Bearer ${token}`
		})
	});
}

async function listenToAuth() {
	const { getAuth, onIdTokenChanged } = await import('firebase/auth');
	const auth = getAuth(app);
	let unsubData: Unsubscribe;

	onIdTokenChanged(
		auth,
		async (currentUser) => {
			console.log('Auth state changed!', currentUser?.uid);
			user.set(currentUser);

			if (currentUser) {
				await setToken(await currentUser.getIdToken());

				const { onSnapshot, collection, query } = await import('firebase/firestore');
				stopsRef.set(collection(db, `userdata/${currentUser.uid}/stops`));

				const q = query(get(stopsRef));
				unsubData = onSnapshot(q, (snap) => {
					const stops: savedStop[] = [];
					snap.forEach((doc) => stops.push(doc.data()));
					savedStops.set(stops);
				});
			} else {
				unsubData && unsubData();
				await setToken('');
				userInfo.set({});
				savedStops.set([]);
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
		const { initializeApp } = await import('firebase/app');
		app = initializeApp(firebaseConfig);

		const { initializeFirestore, persistentLocalCache } = await import('firebase/firestore');
		db = initializeFirestore(app, {
			localCache: persistentLocalCache({})
		});
		listenToAuth();
	}
}

export async function elevateAnonToGoogle() {
	const { getAuth, GoogleAuthProvider, signInWithPopup, linkWithCredential } = await import(
		'firebase/auth'
	);
	const auth = getAuth(app);
	const provider = new GoogleAuthProvider();
	const result = await signInWithPopup(auth, provider);
	const credential = GoogleAuthProvider.credentialFromResult(result);
	// console.log(result);
	if (get(user) !== null && credential) {
		linkWithCredential(get(user)!, credential)
			.then(() => console.log('Elevation success'))
			.catch((error) => console.log('Failure', error));
	}
}

export async function signUserOut() {
	if (!app) throw Error('Firebase app not initialized');
	const { getAuth, signOut } = await import('firebase/auth');
	await signOut(getAuth(app));
}
