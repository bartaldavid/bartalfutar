<script lang="ts">
  import { browser } from '$app/environment';
  import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';
  import Header from '../components/Header.svelte';
  import '../app.css';
  import { savedStops, user } from '../util/client/firebase';

  import StopsView from '../components/StopsView.svelte';
  import type { LayoutData } from './$types';
  import { page } from '$app/stores';
  import { shortcut } from '../util/client/shortcut';
  import { goto } from '$app/navigation';
  import { setContext } from 'svelte';
  import Search from "~icons/material-symbols/search"
  //   import { redirect } from '@sveltejs/kit';
  //   import { onMount } from 'svelte';
  // import {
  // 	clearLocalStorageData,
  // 	getLocalStorageStops,
  // 	getLocalStorageUser,
  // 	setLocalStorageUser
  // } from '../util/client/localstorage';

  export let data: LayoutData;
  // $savedStops = data?.stops ?? [];

  setContext('serverdata', data);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser
      }
    }
  });

  // onMount(() => {
  // 	if (!data.user?.uid) return;

  // 	if (data.user.uid === getLocalStorageUser()) {
  // 		console.log(getLocalStorageStops());
  // 	} else {
  // 		clearLocalStorageData();
  // 		setLocalStorageUser(data.user.uid);
  // 	}
  // });
</script>

<svelte:head>
  <title>BartalFUTÁR</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
  <Header />
  <main class="flex flex-row flex-wrap justify-center gap-4 mx-2">
    {#if $user || data.user}
      <div
        class="mt-4 w-full flex-col flex gap-1 {$savedStops.length === 0
          ? 'justify-center'
          : ''} {$page.url.pathname === '/search' && 'hidden md:flex'} gap-2 sm:w-72"
      >
        {#if !$savedStops.length && !data.stops?.length}
          <div class="p-4 pb-0 text-center text-4xl dark:text-slate-50">BartalFUTÁR</div>
          <div class="pb-10 text-center dark:text-slate-200">Add stops to get started</div>
        {:else}
          <StopsView />
        {/if}

        <div class="flex gap-2 rounded bg-slate-50 dark:bg-slate-800">
          <button
            class="button-outline bg-white text-center dark:border-none dark:bg-slate-700 dark:text-white"
            on:click={() => goto('/search')}
            use:shortcut={{ control: true, code: 'KeyK' }}
            ><Search class="inline" inline={true}/><span>
              {' '}Search</span
            >
          </button>
        </div>
      </div>
    {/if}
    <slot />
  </main>
</QueryClientProvider>

<style>
  .button-outline {
    @apply flex-1 rounded border p-2;
  }
</style>
