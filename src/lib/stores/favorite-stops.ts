import { anonymousLogin, user } from '$lib/firebase';
import { get, writable } from 'svelte/store';
import type { components } from '../data/bkk-openapi';

// FIXME this type declaration shouldn't be here

export type savedStop = components['schemas']['TransitStop'] & {
  routeRef?: {
    [key: string]: components['schemas']['TransitRoute'] | undefined;
  };
};

export async function removeStopFromFirestore(id: string) {
  if (!get(user)?.uid) throw Error('No user found');

  const { deleteDoc, doc, getFirestore } = await import('firebase/firestore');

  await deleteDoc(doc(getFirestore(), `userdata/${get(user)?.uid}/stops`, id));
}

export async function saveStopToFirestore(stop: savedStop) {
  if (!get(user)?.uid) {
    await anonymousLogin();
  }

  if (!stop?.id) throw Error('No stopId');

  const { setDoc, doc, getFirestore } = await import('firebase/firestore');

  await setDoc(doc(getFirestore(), `userdata/${get(user)?.uid}/stops`, stop.id), stop);
}

export const savedStops = writable<savedStop[]>([]);

user.subscribe(async ($user) => {
  if (!$user) {
    savedStops.set([]);
    return;
  }

  const { onSnapshot, collection, getFirestore } = await import('firebase/firestore');

  const query = collection(getFirestore(), `userdata/${$user.uid}/stops`);

  return onSnapshot(query, (snapshot) => {
    const stops = snapshot.docs.map((doc) => doc.data() as savedStop);
    savedStops.set(stops);
  });
});
