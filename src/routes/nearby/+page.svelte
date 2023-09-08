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

  $: nearbyDepartures = createQuery({
    queryKey: ['departuresForLocation'],
    queryFn: async () =>
      safeFetch<components['schemas']['ArrivalsAndDeparturesForLocationOTPMethodResponse']>(
        nearbyDeparturesUrl({
          lon: 19.1836588361196,
          lat: 47.452680314157426,
          radius: 500,
          minutesAfter: 90,
          onlyDepartures: true,
          limit: 30,
          minResult: 5,
          version: '4'
          // includeReferences: ['stops']
        })
      ),
    refetchInterval: REFETCH_INTERVAL_MS
    // enabled: false
  });

  $: console.log($location);
</script>

<PageLayout pageTitle="Around you">
  <svelte:fragment slot="content">
    <div class="flex flex-col gap-2">
      <button
        class="text-white"
        on:click={() => {
          loadLocation();
        }}>get location</button
      >
      {#each $nearbyDepartures.data?.data?.list ?? [] as departureGroup ((departureGroup.routeId ?? '') + departureGroup.headsign)}
        <DepartureGroup {departureGroup} references={$nearbyDepartures.data?.data?.references} />
      {/each}
    </div>
  </svelte:fragment>
</PageLayout>
