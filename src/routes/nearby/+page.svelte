<script lang="ts">
  import { onMount } from 'svelte';
  import PageLayout from '../../components/PageLayout.svelte';
  import { nearbyDeparturesUrl } from '../../data/api-links';
  import { safeFetch } from '$lib/safeFetch';
  import type { components } from '../../data/bkk-openapi';
  import { createQuery } from '@tanstack/svelte-query';
  import DepartureGroup from '../../components/DepartureGroup.svelte';
  import { loadLocation, location } from '$lib/stores/geolocation';
  import { REFETCH_INTERVAL_MS } from '../../data/constants';
  import LocationSearchingIcon from "~icons/material-symbols/location-searching";
  import MyLocationIcon from "~icons/material-symbols/my-location";
  import LocationDisabledIcon from "~icons/material-symbols/location-disabled"
  import { error } from '@sveltejs/kit';

  $: nearbyDepartures = createQuery({
    queryKey: ['departuresForLocation', $location.position?.coords],
    queryFn: async () =>
      safeFetch<components['schemas']['ArrivalsAndDeparturesForLocationOTPMethodResponse']>(
        nearbyDeparturesUrl({
          lon: $location.position?.coords.longitude,
          lat: $location.position?.coords.latitude,
          radius: 500,
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

  onMount(() => {
    loadLocation();
  });
</script>

<PageLayout pageTitle="Around you">
  <svelte:fragment slot="header">
    <button
      class="text-white"
      on:click={() => {
        loadLocation();
      }}>{#if $location.isLoaded}
          <MyLocationIcon />
        {:else if $location.error}
        <LocationDisabledIcon />
        {:else}
        <LocationSearchingIcon />
      {/if}</button
    >
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="flex flex-col gap-2">
      {#each $nearbyDepartures.data?.data?.list ?? [] as departureGroup ((departureGroup.routeId ?? '') + departureGroup.headsign)}
        <DepartureGroup {departureGroup} references={$nearbyDepartures.data?.data?.references} />
      {/each}
      {#if $location.error}
        <div class="text-red-500">{$location.error.message}</div>
      {/if}
    </div>
  </svelte:fragment>
</PageLayout>
