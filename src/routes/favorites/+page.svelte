<script lang="ts">
  import { user } from '$lib/firebase';
  import { savedStops } from '$lib/stores/favorite-stops';
  import { getContext } from 'svelte';
  import StopsView from '../../components/StopsView.svelte';
  import type { serverData } from '../+layout.server';
  const serverdata = getContext<serverData>('serverdata');
  $: profile_image_url = serverdata.user?.photoUrl ?? $user?.photoURL;
</script>

<div class="flex flex-col">
  <div class="flex justify-between items-center mt-12 mb-4">
    <h1 class="text-2xl text-white">Favorites</h1>
    <img src={profile_image_url} alt="Profile" height="30" width="30" class="rounded-full m-1" />
  </div>
  {#if $user}
    <div class="">
      {#if $savedStops.length}
        <StopsView />
      {:else}
        <div class="text-center dark:text-slate-200">Add stops to get started</div>
      {/if}
    </div>
  {/if}
</div>
