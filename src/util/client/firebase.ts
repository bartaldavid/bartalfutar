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

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
// import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';
import type { savedStop } from './savedStop';
import { derived, get, readable, writable, type Readable } from 'svelte/store';
import {
	collection,
	doc,
	getFirestore,
	onSnapshot,
	writeBatch,
	type Unsubscribe
} from 'firebase/firestore';

export const app = initializeApp(firebaseConfig);
// export const db = initializeFirestore(app, {
// 	localCache: persistentLocalCache({})
// });
export const db = getFirestore();
export const auth = getAuth();

type UserInfo = {
	name?: string;
	provider?: string;
	uid?: string;
};

export const userInfo = writable<UserInfo>({});

async function setToken(token: string) {
	if (!browser) return;
	await fetch('/api/token', {
		method: 'POST',
		headers: new Headers({
			Authorization: `Bearer ${token}`
		})
	});
}

function userStore() {
	if (!auth || !browser) {
		console.warn('Auth is not initialized or not in browser.');
		return readable<User | null>(null);
	}

	let unsubscribe: Unsubscribe;

	const { subscribe } = readable(auth.currentUser, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => set(user));

		return () => unsubscribe();
	});

	return { subscribe };
}

export const user = userStore();

export function collectionStore<T>(path: string) {
	let unsubscribe: Unsubscribe;

	const docRef = collection(db, path);

	const { subscribe } = writable<T[]>([], (set) => {
		unsubscribe = onSnapshot(docRef, (snapshot) => {
			const docs: T[] = [];
			snapshot.forEach((doc) => docs.push(doc.data() as T));
			set(docs);
		});

		return () => unsubscribe();
	});

	return { subscribe };
}

export const savedStops: Readable<savedStop[]> = derived(user, ($user, set) => {
	if ($user) {
		return collectionStore<savedStop>(`userdata/${$user.uid}/stops`).subscribe(set);
	} else {
		set([]);
	}
});

export async function elevateAnonToGoogle() {
	const { GoogleAuthProvider, signInWithPopup, linkWithCredential } = await import('firebase/auth');
	const provider = new GoogleAuthProvider();
	const result = await signInWithPopup(auth, provider);
	const credential = GoogleAuthProvider.credentialFromResult(result);

	const currentUser = get(user);
	// console.log(result);
	if (currentUser !== null && credential) {
		linkWithCredential(currentUser, credential)
			.then(() => console.log('Elevation success'))
			.catch((error) => console.log('Failure', error));
	}
	await setToken((await currentUser?.getIdToken()) ?? '');
}

export async function signUserOut() {
	const { signOut } = await import('firebase/auth');
	await setToken('');
	await signOut(auth);
}
