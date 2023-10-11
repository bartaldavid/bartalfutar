<script lang="ts">
  import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';
  import '../app.css';
  import type { LayoutData } from './$types';
  import { onMount, setContext } from 'svelte';
  import NavBar from '../components/NavBar.svelte';
  import { browser } from '$app/environment';
  import { setToken, user } from '$lib/firebase';
  import { writable } from 'svelte/store';

  export let data: LayoutData;

  const favoriteStopIds = writable<string[]>([]);
  $: $favoriteStopIds = data.favorite_stops_ids;

  setContext('favoriteStops', favoriteStopIds);

  /*
  $: if (browser && !data.user && $user) {
    resetToken();
  }

  async function resetToken() {
    if (!$user) return;
    await setToken(await $user.getIdToken());
  }
  */
</script>

<svelte:head>
  <title>BartalFUTÁR</title>
</svelte:head>

<QueryClientProvider client={data.queryClient}>
  <main class="mx-2 flex justify-center md:flex-row">
    <NavBar />
    <slot />
  </main>
</QueryClientProvider>
