// import type { Handle } from '@sveltejs/kit';
// import { serverAuth } from './lib/server/firebase-admin';

// export const handle = (async ({ event, resolve }) => {
//   const sessionCookie = event.cookies.get('__session');

//   if (!sessionCookie) return resolve(event);

//   try {
//     const decodedClaims = await serverAuth.verifySessionCookie(sessionCookie);
//     event.locals.userId = decodedClaims.uid;
//   } catch (error) {
//     event.locals.userId = null;
//   }

//   return resolve(event);
// }) satisfies Handle;

import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import Github from '@auth/core/providers/github';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

export const handle = SvelteKitAuth({
  providers: [Github({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
  adapter: SupabaseAdapter({
    url: PUBLIC_SUPABASE_URL,
    secret: SUPABASE_SERVICE_ROLE_KEY
  }),
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
      }
      return Promise.resolve(session);
    }
  }
});
