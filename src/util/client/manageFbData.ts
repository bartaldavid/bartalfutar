import { deleteDoc, doc, setDoc, writeBatch } from 'firebase/firestore';
import { get } from 'svelte/store';
import type { savedStop } from './savedStop';
import { user } from './stores';
import { db } from './firebase';

export async function removeStopFromFirestore(id: string) {
	await deleteDoc(doc(db, `userdata/${get(user)?.uid}/stops`, id));
	console.log('Removed');
}

export async function saveStopToFirestore(stop: savedStop) {
	if (get(user) && get(user)?.uid !== null && stop?.id) {
		await setDoc(
			// FIXME path should be from $stopsRef
			doc(db, `userdata/${get(user)?.uid}/stops`, stop.id),
			stop
		);
		console.log('Saved');
	} else {
		console.error('either uid or stopId is null');
	}
}

export async function batchWriteStopsToFirestore(stops: savedStop[]) {
	const batch = writeBatch(db);
	stops.forEach((stop) => {
		if (!get(user) || !stop.id) return;
		batch.set(doc(db, `userdata/${get(user)?.uid}/stops`, stop.id), stop);
	});
	await batch.commit();
	console.log('Batch write successful');
}
