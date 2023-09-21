<script lang="ts">
  import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';
  import '../app.css';
  import type { LayoutData } from './$types';
  import { onMount, setContext } from 'svelte';
  import NavBar from '../components/NavBar.svelte';
  import { browser } from '$app/environment';
  import { setToken, user } from '$lib/firebase';

  export let data: LayoutData;
  setContext('serverdata', data);
  onMount(async () => {
    // resets token when cookie expires or is deleted
    if (browser && !data.user && $user) {
      await setToken(await $user.getIdToken());
    }
  });
</script>

<svelte:head>
  <title>BartalFUTÁR</title>
  <meta name="description" content="Faster alternative to BudapestGo" />
</svelte:head>

<QueryClientProvider client={data.queryClient}>
  <main class="mx-2 flex justify-center md:flex-row">
    <NavBar />
    <slot />
  </main>
</QueryClientProvider>
