<script lang="ts">
  import { elevateAnonToGoogle, user } from '$lib/firebase';
  import { savedStops } from '$lib/stores/favorite-stops';
  import { getContext } from 'svelte';
  import StopsView from '../../components/StopsView.svelte';
  import type { serverData } from '../+layout.server';
  import PageLayout from '../../components/PageLayout.svelte';
  import type { PageData } from './$types';

  import AccountCircleIcon from '~icons/material-symbols/account-circle';
  const serverdata = getContext<serverData>('serverdata');

  export let data: PageData;

  $: stops = $savedStops.length ? $savedStops : data.stops ?? [];
  $: profile_image_url = serverdata.user?.photoUrl ?? $user?.photoURL;
</script>

<PageLayout pageTitle="Favorites">
  <svelte:fragment slot="header">
    {#if $user}
      {#if profile_image_url}
        <img
          src={profile_image_url}
          alt="Profile"
          height="30"
          width="30"
          class="m-1 rounded-full"
        />
      {:else if !$user?.isAnonymous}
        <AccountCircleIcon class="m-1 dark:text-slate-50" />
      {/if}
    {/if}
    {#if !serverdata.user && (!$user || $user?.isAnonymous)}
      <button on:click={elevateAnonToGoogle} class="rounded bg-slate-700 p-2 text-white"
        >Sign in</button
      >
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="content">
    {#if stops.length}
      <StopsView {stops} />
    {:else}
      <div class="text-center dark:text-slate-200">Add stops to get started</div>
    {/if}
  </svelte:fragment>
</PageLayout>
