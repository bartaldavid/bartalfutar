import { redirect } from '@sveltejs/kit';
import { adminDB, serverAuth } from '../lib/server/firebase-admin';
import type { savedStop } from '../util/client/savedStop';
import type { LayoutServerLoad } from './$types';
// import { goto } from '$app/navigation';

export type serverData = {
  signedIn: boolean;
  stops?: savedStop[];
  user?: serverUserData;
};

export type serverUserData = {
  uid?: string;
  name?: string;
  isAnonymous?: boolean;
  photoUrl?: string;
};

export const load: LayoutServerLoad = async ({ locals, route }): Promise<serverData> => {
  const userId = locals.userId;

  if (!userId && route.id !== '/login') {
    console.log(userId);
    throw redirect(303, '/login');
  } else if (!userId) {
    return { signedIn: false };
  }

  const querySnapshot = await adminDB.collection(`userdata/${userId}/stops`).get();
  const stops = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const user = await serverAuth.getUser(userId);
  return {
    signedIn: true,
    stops,
    user: {
      uid: userId,
      name: user.displayName,
      isAnonymous: !user.email,
      photoUrl: user.photoURL
    }
  };
};
