<script lang="ts">
  import { user } from '$lib/firebase';
  import { savedStops } from '$lib/stores/favorite-stops';
  import { getContext } from 'svelte';
  import StopsView from '../../components/StopsView.svelte';
  import type { serverData } from '../+layout.server';
  import PageLayout from '../../components/PageLayout.svelte';
  const serverdata = getContext<serverData>('serverdata');
  $: profile_image_url = serverdata.user?.photoUrl ?? $user?.photoURL;
</script>

<PageLayout pageTitle="Favorites">
  <img
    slot="header"
    src={profile_image_url}
    alt="Profile"
    height="30"
    width="30"
    class="rounded-full m-1"
  />
  <svelte:fragment slot="content">
    {#if $user}
      <div class="">
        {#if $savedStops.length}
          <StopsView />
        {:else}
          <div class="text-center dark:text-slate-200">Add stops to get started</div>
        {/if}
      </div>
    {/if}
  </svelte:fragment>
</PageLayout>
