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
import { collection, getFirestore, onSnapshot, type Unsubscribe } from 'firebase/firestore';
import { goto, invalidateAll } from '$app/navigation';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();

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
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return { subscribe };
}

export const user = userStore();

export function collectionStore<T>(path: string) {
  let unsubscribe: Unsubscribe;

  const query = collection(db, path);

  return writable<T[]>([], (set) => {
    unsubscribe = onSnapshot(query, (snapshot) => {
      const docs: T[] = [];
      snapshot.forEach((doc) => docs.push(doc.data() as T));
      set(docs);
    });

    return () => unsubscribe();
  });
}

export const savedStops: Readable<savedStop[]> = derived(user, ($user, set) => {
  if ($user) {
    return collectionStore<savedStop>(`userdata/${$user.uid}/stops`).subscribe(set);
  } else {
    set([]);
  }
});

// TODO redirect signin, ignore handle provider already linked error
export async function elevateAnonToGoogle() {
  const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
  const prevUser = get(user);

  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  if (prevUser !== null && credential) {
    try {
      const { linkWithCredential } = await import('firebase/auth');
      await linkWithCredential(prevUser, credential);
    } catch (error) {
      console.error('Elevation failure:', error);
    }
  }
  await setToken(await result.user.getIdToken());
  goto('/');
}

export async function anonymousLogin() {
  const { signInAnonymously } = await import('firebase/auth');
  const result = await signInAnonymously(auth);
  await setToken(await result.user.getIdToken())
  goto('/');
}


export async function signUserOut() {
  const { signOut } = await import('firebase/auth');
  await setToken('');
  await signOut(auth);
  await invalidateAll();
  goto('/login');
}
