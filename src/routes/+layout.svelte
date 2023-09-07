<script lang="ts">
  import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';
  import Header from '../components/Header.svelte';
  import '../app.css';
  import { user } from '../lib/firebase';

  import StopsView from '../components/StopsView.svelte';
  import type { LayoutData } from './$types';
  import { page } from '$app/stores';
  import { shortcut } from '../lib/shortcut';
  import { setContext } from 'svelte';
  import Search from '~icons/material-symbols/search';
  import { savedStops } from '$lib/stores/favorite-stops';
  import NavBar from '../components/NavBar.svelte';

  export let data: LayoutData;

  const isSarchOpen = $page.url.pathname === '/search';

  setContext('serverdata', data);
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
