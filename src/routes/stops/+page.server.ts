import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, fetch }) => {
    const data = await request.formData();
    const stopId = data.get('stopId');
    const saved = data.get('saved') === 'true';

    if (saved) {
      const response = await fetch(`/api/stops/${stopId}`, { method: 'DELETE' });
      console.log(response.json());
    }

    throw redirect(303, `/stops/${stopId}`);
  }
};
