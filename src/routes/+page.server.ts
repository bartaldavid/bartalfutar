import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  const session = await locals.getSession();

  if (session) {
    redirect(303, '/favorites');
  } else {
    redirect(303, '/nearby');
  }
}
