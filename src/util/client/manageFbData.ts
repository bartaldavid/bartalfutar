import { get } from 'svelte/store';
import type { savedStop } from './savedStop';
import { user } from './firebase';
import { db } from './firebase';

export async function removeStopFromFirestore(id: string) {
	if (!get(user)?.uid) throw Error('No user found');

	const { deleteDoc, doc } = await import('firebase/firestore');

	await deleteDoc(doc(db, `userdata/${get(user)?.uid}/stops`, id));
}

export async function saveStopToFirestore(stop: savedStop) {
	if (!get(user)?.uid) throw Error('No user found');
	if (!stop?.id) throw Error('No stopId');

	const { setDoc, doc } = await import('firebase/firestore');

	await setDoc(
		// FIXME path should be from $stopsRef
		doc(db, `userdata/${get(user)?.uid}/stops`, stop.id),
		stop
	);
}
