import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { db } from '$lib/server/libsql-db';
import Google from '@auth/sveltekit/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { SvelteKitAuth, type DefaultSession } from '@auth/sveltekit';

export const { handle } = SvelteKitAuth({
  providers: [
    // GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true
    })
  ],
  adapter: DrizzleAdapter(db),
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
      }
      return Promise.resolve(session);
    }
  },
  trustHost: true
});

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module '@auth/sveltekit' {
  interface Session {
    user: {
      id: string;
    };
  }
}
