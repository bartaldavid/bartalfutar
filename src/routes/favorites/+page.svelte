<script lang="ts">
  import StopsView from '../../components/StopsView.svelte';
  import PageLayout from '../../components/PageLayout.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  $: stops = data.stops ?? [];
</script>

<PageLayout pageTitle="Favorites">
  <svelte:fragment slot="header">
    {#if data.session?.user?.image}
      <img
        src={data.session?.user?.image}
        alt="Profile"
        height="30"
        width="30"
        class="m-1 aspect-square rounded-full"
      />
      <!-- {:else if $user && !$user?.isAnonymous}
      <AccountCircleIcon class="m-1 dark:text-slate-50" /> -->
    {/if}
    <!-- {#if data.session?.user && (!$user || $user?.isAnonymous)}
      <button on:click={elevateAnonToGoogle} class="rounded bg-slate-700 p-2 text-white"
        >Sign in</button
      >
    {/if} -->
  </svelte:fragment>
  <svelte:fragment slot="content">
    {#if stops.length}
      <StopsView {stops} />
    {:else}
      <div class="text-center dark:text-slate-200">Add stops to get started</div>
    {/if}
    <button class="rounded bg-slate-700 p-2 text-white" on:click={() => console.log(data.session)}
      >Get user</button
    >
    <a href="/auth/signin" data-sveltekit-preload-data="off">Sign In</a>
    <a href="/auth/signout" data-sveltekit-preload-data="off">Sign Out</a>
  </svelte:fragment>
</PageLayout>
