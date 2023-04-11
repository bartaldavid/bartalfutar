import { onAuthStateChanged, type Unsubscribe, type User } from 'firebase/auth';
import type { CollectionReference, DocumentData } from 'firebase/firestore';
import { get, writable } from 'svelte/store';
import { auth, db } from '../util/firebaseSetup';
import type { components } from './bkk-openapi';

// FIXME this type declaration shouldn't be here
export type savedStop = components['schemas']['TransitStop'] & {
	routeRef?: {
		[key: string]: components['schemas']['TransitRoute'] | undefined;
	};
};

// TODO migration function ls->fb ?

export const savedStops = writable<savedStop[]>([]);

export const user = writable<User>(); // FIXME user shouldn't be null, or should it?
export const stopsRef = writable<CollectionReference<DocumentData>>();

let unsubData: Unsubscribe;

onAuthStateChanged(auth, async (currentUser) => {
	console.log('Auth state changed!');
	if (currentUser) {
		user.set(currentUser);
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
	}
});

savedStops.subscribe((stops) => console.log(stops));
user.subscribe((stops) => console.log(stops));
