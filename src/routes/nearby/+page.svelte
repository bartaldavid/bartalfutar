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
    onSuccess(data) {
      console.log('nearby departures', data);
    }
  });
  let permissionState: PermissionState = "prompt";
  
  onMount(async () => {
    permissionState = (await navigator.permissions.query({ name: "geolocation" })).state;
    if (permissionState === "granted") loadLocation()
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
          <!-- <span class="text-xs">
            {$location.position?.coords.accuracy.toFixed(0)}m
          </span> -->
        {:else if $location.error}
          <LocationDisabledIcon />
        {:else}
          <LocationSearchingIcon />
        {/if}
      </button>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="flex flex-col gap-2">
      {#if !$nearbyDepartures.isFetched}
        <LoadingCards numberOfItems={3} />
      {:else if $nearbyDepartures.isError}
        <div class="text-red-500">{$nearbyDepartures.error}</div>
      {:else}
        {#each $nearbyDepartures.data?.data?.list ?? [] as departureGroup ((departureGroup.routeId ?? '') + departureGroup.headsign)}
          <DepartureGroup {departureGroup} references={$nearbyDepartures.data?.data?.references} />
        {:else}
          <div class="text-gray-500 text-center">No departures found</div>
        {/each}
      {/if}

      {#if permissionState === "prompt"}
        <div class="text-slate-500">Please grant access to your location to show departures around you.</div>
        <button on:click={() => loadLocation()}>Grant access</button>
      {:else if permissionState === "denied"}
        <span>You didn't allow us to see where you are. That's understandable, but we cannot help in this case.</span>
      {/if}
    </div>
  </svelte:fragment>
</PageLayout>
