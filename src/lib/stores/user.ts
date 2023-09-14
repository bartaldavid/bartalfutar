import { auth } from '$lib/firebase';
import type { UserRecord } from 'firebase-admin/auth';
import { onAuthStateChanged, type Auth, type User } from 'firebase/auth';
import { get, writable } from 'svelte/store';

/**
 * @param  {Auth} auth firebase auth instance
 * @param  {UserRecord} startWith optional default data. Useful for server-side cookie-based auth
 * @returns a store with the current firebase user
 */
function customUserStore(auth: Auth, startWith = null) {
  // Fallback for SSR
  if (!globalThis.window) {
    const { subscribe } = writable(startWith);
    return {
      subscribe
    };
  }

  // Fallback for missing SDK
  if (!auth) {
    console.warn(
      'Firebase Auth is not initialized. Are you missing FirebaseApp as a parent component?'
    );
    const { subscribe } = writable(null);
    return {
      subscribe
    };
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    return onAuthStateChanged(auth, (user) => {
      set(user);
    });
  });

  return {
    subscribe
  };
}

const user = customUserStore(auth);

await get(user)?.getIdToken?.();
