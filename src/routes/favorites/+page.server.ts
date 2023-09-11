import { adminDB } from '$lib/server/firebase-admin';
import type { savedStop } from '$lib/stores/favorite-stops';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const userId = locals.userId;

  if (!userId) {
    return { stops: [] };
  }

  const querySnapshot = await adminDB.collection(`userdata/${userId}/stops`).get();
  const stops = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as savedStop);

  return { stops };
}) satisfies PageServerLoad;
