// import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, fetch }) => {
    const data = await request.formData();
    const stopId = data.get('stopId');
    const saved = data.get('saved') === 'true';

    console.log({ stopId, saved });

    if (saved) {
      await fetch(`/api/stops`, {
        method: 'DELETE',
        body: JSON.stringify({ stopId })
      });
    } else {
      console.log('saving');
      await fetch('/api/stops', {
        method: 'POST',
        body: JSON.stringify({ stopId })
      });
    }

    // throw redirect(303, `/stops/${stopId}`);
  }
};
