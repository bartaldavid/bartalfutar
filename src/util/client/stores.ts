import type { User } from 'firebase/auth';
import type { CollectionReference, DocumentData } from 'firebase/firestore';
import { writable } from 'svelte/store';
import type { savedStop } from './savedStop';

// FIXME maybe initialize store on the server?
export const savedStops = writable<savedStop[]>([]);

export const user = writable<User | null>(); // FIXME user shouldn't be null, or should it?
export const stopsRef = writable<CollectionReference<DocumentData>>();

type UserInfo = {
	name?: string;
	provider?: string;
	uid?: string;
};

export const userInfo = writable<UserInfo>({});

savedStops.subscribe((stops) => console.log(stops));
