import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
  if (locals.userId) {
    throw redirect(303, '/favorites');
  } else {
    throw redirect(303, '/nearby');
  }
}
