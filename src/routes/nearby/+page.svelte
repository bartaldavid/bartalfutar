<script lang="ts">
  import { onMount } from 'svelte';
  import PageLayout from '../../components/PageLayout.svelte';
  import { nearbyDeparturesUrl } from '../../lib/data/api-links';
  import { safeFetch } from '$lib/safeFetch';
  import type { components } from '../../lib/data/bkk-openapi';
  import { createQuery } from '@tanstack/svelte-query';
  import DepartureGroup from '../../components/DepartureGroup.svelte';
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
  } from '$lib/stores/geolocation-permission';

  $: nearbyDepartures = createQuery({
    queryKey: ['departuresForLocation', $location.position?.coords],
    queryFn: async () =>
      safeFetch<components['schemas']['ArrivalsAndDeparturesForLocationOTPMethodResponse']>(
        nearbyDeparturesUrl({
          lon: $location.position?.coords.longitude,
          lat: $location.position?.coords.latitude,
          radius: 400,
          minutesBefore: 0,
          minutesAfter: 180,
          onlyDepartures: true,
          limit: 50,
          minResult: 5,
          version: '4'
        })
      ),
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

<PageLayout pageTitle="Around you">
  <svelte:fragment slot="header">
    <div class="flex gap-1 dark:text-slate-50">
      <RefreshButton
        isFetching={$nearbyDepartures.isFetching}
        on:refresh={async () => await $nearbyDepartures.refetch()}
      />
      <button
        on:click={() => {
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
      </button>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="flex flex-col gap-2">
      {#if $nearbyDepartures.isLoading}
        <LoadingCards numberOfItems={2} />
      {:else if $nearbyDepartures.isError}
        <div class="text-red-500">{$nearbyDepartures.error}</div>
      {:else if $nearbyDepartures.isFetched}
        {#each $nearbyDepartures.data?.data?.list ?? [] as departureGroup ((departureGroup.routeId ?? '') + departureGroup.headsign)}
          <DepartureGroup {departureGroup} references={$nearbyDepartures.data?.data?.references} />
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
            <button
              on:click={() => loadLocation()}
              class="rounded bg-slate-300 p-2 px-8 text-blue-600 hover:bg-slate-200 dark:bg-slate-600 dark:text-blue-300 hover:dark:bg-slate-500"
              >Allow</button
            >
          {/if}
        </div>
      {/if}
    </div>
  </svelte:fragment>
</PageLayout>
