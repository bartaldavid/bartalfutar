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
  import { error } from '@sveltejs/kit';
  import RefreshButton from '../../components/RefreshButton.svelte';
  import LoadingCards from '../../components/LoadingCards.svelte';
  import Countdown from '../../components/Countdown.svelte';
  import { geolocationPermissionState, listenForPermissionChange } from '$lib/stores/geolocation-permission';

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
    enabled: $location.isLoaded,
  });
  
  onMount(async () => {
    $geolocationPermissionState = (await navigator.permissions.query({ name: "geolocation" })).state;

    if ($geolocationPermissionState === "granted") loadLocation()
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
        aria-label="Reload location"
      >
        {#if $location.isLoaded}
          <MyLocationIcon />
          <!-- <span class="text-xs">
            {$location.position?.coords.accuracy.toFixed(0)}m
          </span> -->
        {:else if $location.error || $geolocationPermissionState === "denied"}
          <LocationDisabledIcon />
        {:else}
          <LocationSearchingIcon />
        {/if}
      </button>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="flex flex-col gap-2">
      {#if $nearbyDepartures.isInitialLoading}
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
      
      {#if $geolocationPermissionState === "prompt"}
        <div class="bg-slate-50 dark:bg-slate-800 p-2 justify-center flex flex-col gap-2">
          <div class="text-slate-700">Please allow us to access your location to show departures around you.</div>
          <button on:click={() => loadLocation()} class="hover:bg-slate-300 bg-slate-200 dark:bg-slate-700 p-2 rounded text-blue-600">Allow</button>
        </div>
      {:else if $geolocationPermissionState === "denied"}
        <span class="text-red-600 text-sm">You didn't allow us to see where you are. That's understandable, but we cannot help in this case.</span>
      {/if}
    </div>

  </svelte:fragment>
</PageLayout>
