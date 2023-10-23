<script lang="ts">
  import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';
  import '../app.css';
  import type { LayoutData } from './$types';
  import NavBar from '../components/NavBar.svelte';

  export let data: LayoutData;
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
