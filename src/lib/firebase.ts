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
import { getAuth, onAuthStateChanged, type Unsubscribe, type User } from 'firebase/auth';
// import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';
import { get, readable } from 'svelte/store';
import { goto, invalidateAll } from '$app/navigation';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

async function setToken(token: string) {
  if (!browser) return;
  const uid = await fetch('/api/token', {
    method: 'POST',
    headers: new Headers({
      Authorization: `Bearer ${token}`
    })
  });
  console.log(uid);
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

  const idToken = await result.user.getIdToken();
  await setToken(idToken);
  await goto('/');
  console.log('gone!');
}

export async function anonymousLogin() {
  const { signInAnonymously } = await import('firebase/auth');
  const result = await signInAnonymously(auth);
  await setToken(await result.user.getIdToken());
  goto('/');
}

export async function signUserOut() {
  const { signOut } = await import('firebase/auth');
  try {
    console.log(auth);
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
  await invalidateAll();
  await setToken('');
  goto('/login');
}
