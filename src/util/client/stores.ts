import type { User } from 'firebase/auth';
import type { CollectionReference, DocumentData } from 'firebase/firestore';
import { writable } from 'svelte/store';
// import { saveStopsToLf } from '../localforage';
import type { savedStop } from './savedStop';

// FIXME maybe initialize store on the server?
export const savedStops = writable<savedStop[]>([]);

export const user = writable<User | null>(/*await getUserFromIndexedDB()*/); // FIXME user shouldn't be null, or should it?
export const stopsRef = writable<CollectionReference<DocumentData>>();

savedStops.subscribe((stops) => console.log(stops));
