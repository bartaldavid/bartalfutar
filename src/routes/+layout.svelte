<script lang="ts">
  import { QueryClientProvider } from '@tanstack/svelte-query';
  import '../app.css';
  import type { LayoutData } from './$types';
  import { onMount } from 'svelte';
  import NavBar from '$components/NavBar.svelte';
  import { ModeWatcher } from 'mode-watcher';

  // export let data: LayoutData;
  let { data, children } = $props();

  onMount(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js', { scope: '/' });
      });
    }
  });
</script>

<svelte:head>
  <title>BartalFUTÁR</title>
</svelte:head>

<QueryClientProvider client={data.queryClient}>
  <main class="mx-2 flex justify-center md:flex-row">
    <NavBar />
    {@render children()}
  </main>
</QueryClientProvider>

<ModeWatcher />
