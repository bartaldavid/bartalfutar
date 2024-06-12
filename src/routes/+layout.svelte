<script lang="ts">
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import { i18n } from '$lib/i18n';

  import { QueryClientProvider } from '@tanstack/svelte-query';
  import '../app.css';
  import type { LayoutData } from './$types';
  import { onMount } from 'svelte';
  import NavBar from '$components/NavBar.svelte';
  import { ModeWatcher } from 'mode-watcher';
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

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

<ParaglideJS {i18n}>
  <QueryClientProvider client={data.queryClient}>
    <main class="mx-2 flex justify-center md:flex-row">
      <NavBar />
      {@render children()}
    </main>
    <SvelteQueryDevtools />
  </QueryClientProvider>

  <ModeWatcher />
</ParaglideJS>
