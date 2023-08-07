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
  <!-- <Header /> -->
  <main class="mx-2 flex justify-center">
    <!-- {#if $user || data.user}
      <div
        class="mt-4 w-full flex-col flex gap-1 {isSarchOpen && 'hidden md:flex'} gap-2 sm:w-72"
        class:justify-center={!data.stops?.length}
      >
        {#if !$savedStops.length && !data.stops?.length}
          <div class="p-4 pb-0 text-center text-4xl dark:text-slate-50">BartalFUTÁR</div>
          <div class="pb-10 text-center dark:text-slate-200">Add stops to get started</div>
        {:else}
          <StopsView />
        {/if}

        <a
          class="p-2 rounded button-outline bg-white items-center justify-center flex dark:border-none dark:bg-slate-700 dark:text-white"
          href="/search"
          use:shortcut={{ control: true, code: 'KeyK' }}
          role="button"
        >
          <div class="flex items-center gap-1 justify-center">
            <Search class="inline" /><span>Search</span>
          </div>
        </a>
      </div>
    {/if} -->
    <slot />
    <NavBar />
  </main>
</QueryClientProvider>
