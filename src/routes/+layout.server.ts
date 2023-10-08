import type { LayoutServerLoad } from './$types';
// import { goto } from '$app/navigation';

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await locals.getSession();

  return {
    session
  };
};
