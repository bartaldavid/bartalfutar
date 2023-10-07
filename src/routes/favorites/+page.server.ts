// import { adminDB } from '$lib/server/firebase-admin';
// import type { savedStop } from '$lib/stores/favorite-stops';
// import type { PageServerLoad } from './$types';

// export const load = (async ({ locals, fetch }) => {
//   const userId = locals.userId;

//   if (!userId) {
//     return { stops: [] };
//   }

//   const querySnapshot = await adminDB.collection(`userdata/${userId}/stops`).get();
//   const stops = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as savedStop);

//   const supabaseStops = await fetch('/api/stops').then((res) => res.json());
//   console.log(supabaseStops);

//   return { stops };
// }) satisfies PageServerLoad;

export async function load({ locals }) {
  return { session: await locals.getSession(), stops: [] };
}
