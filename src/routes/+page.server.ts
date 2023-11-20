import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  const session = await locals.getSession();

  if (session) {
    throw redirect(303, '/favorites');
  } else {
    throw redirect(303, '/nearby');
  }
}
