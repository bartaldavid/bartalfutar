<script lang="ts">
  import { onMount } from 'svelte';
  import PageLayout from '../../components/PageLayout.svelte';
  import { createQuery } from '@tanstack/svelte-query';
  import DepartureGroup from './DepartureGroup.svelte';
  import { loadLocation, location } from '$lib/stores/geolocation';
  import { REFETCH_INTERVAL_MS } from '../../lib/data/constants';
  import LocationSearchingIcon from '~icons/material-symbols/location-searching';
  import MyLocationIcon from '~icons/material-symbols/my-location';
  import LocationDisabledIcon from '~icons/material-symbols/location-disabled';
  import RefreshButton from '../../components/RefreshButton.svelte';
  import LoadingCards from '../../components/LoadingCards.svelte';
  import {
    geolocationPermissionState,
    listenForPermissionChange
  } from '$lib/stores/geolocation-permission.svelte';
  import { typed_fetch } from '../api/endpoint-types';
  import { Button } from '$lib/components/ui/button';

  let nearbyDepartures = createQuery({
    queryKey: ['departuresForLocation', $location.position?.coords],
    queryFn: async () =>
      await typed_fetch('/api/nearby-departures', {
        lat: $location.position?.coords.latitude,
        lon: $location.position?.coords.longitude,
        radius: 500,
        minutesBefore: 0
      }),
    refetchInterval: REFETCH_INTERVAL_MS,
    enabled: $location.isLoaded
  });

  onMount(async () => {
    $geolocationPermissionState = (await navigator.permissions.query({ name: 'geolocation' }))
      .state;

    if ($geolocationPermissionState === 'granted') loadLocation();
    listenForPermissionChange();
  });
</script>

{#snippet header()}
  <div class="flex gap-1 dark:text-slate-50">
    <RefreshButton
      isFetching={$nearbyDepartures.isFetching}
      onrefresh={async () => await $nearbyDepartures.refetch()}
    />
    <Button
      size="icon"
      variant="ghost"
      onclick={() => {
        loadLocation();
      }}
    >
      {#if $location.isLoaded}
        <MyLocationIcon />
      {:else if $location.error || $geolocationPermissionState === 'denied'}
        <LocationDisabledIcon />
      {:else}
        <LocationSearchingIcon />
      {/if}
    </Button>
  </div>
{/snippet}
<PageLayout pageTitle="Around you" {header}>
  <div class="flex flex-col gap-2">
    {#if $nearbyDepartures.isLoading}
      <LoadingCards numberOfItems={2} />
    {:else if $nearbyDepartures.isError}
      <div class="text-red-500">{$nearbyDepartures.error}</div>
    {:else if $nearbyDepartures.isFetched}
      {#each $nearbyDepartures.data ?? [] as departureGroup (departureGroup.id + departureGroup.headSign)}
        <DepartureGroup {departureGroup} />
      {:else}
        <div class="text-gray-500 text-center">No departures found</div>
      {/each}
    {/if}

    {#if $geolocationPermissionState !== 'granted'}
      <div class="flex flex-col items-center gap-2 rounded bg-slate-50 p-3 dark:bg-slate-800">
        <svelte:component
          this={$geolocationPermissionState === 'prompt'
            ? LocationSearchingIcon
            : LocationDisabledIcon}
          class="mt-4 text-4xl dark:text-slate-50"
        />
        <span class="pb-5 text-center text-2xl font-bold dark:text-slate-50">
          {$geolocationPermissionState === 'prompt'
            ? 'Allow location access'
            : 'Location access denied'}
        </span>
        <p class="  text-slate-700 dark:text-slate-200">
          {$geolocationPermissionState === 'prompt'
            ? 'Please allow us to access your location to show departures around you.'
            : 'You denied us access to your location. Please allow us to access your location to show departures around you.'}
        </p>
        {#if $geolocationPermissionState === 'prompt'}
          <Button on:click={() => loadLocation()}>Allow</Button>
        {/if}
      </div>
    {/if}
  </div>
</PageLayout>
