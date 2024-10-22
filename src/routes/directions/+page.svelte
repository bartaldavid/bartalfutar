<script lang="ts">
  import TimeSelector, { type TimeSelectorProps } from './TimeSelector.svelte';
  import Locate from 'lucide-svelte/icons/locate';
  import MapPin from 'lucide-svelte/icons/map-pin';
  import LocateFixed from 'lucide-svelte/icons/locate-fixed';
  import type { PageData } from './$types';
  import PageLayout from '$components/PageLayout.svelte';
  import {
    geolocationPermissionState,
    listenForPermissionChange,
  } from '$lib/stores/geolocation-permission.svelte';
  import { loadLocation, location } from '$lib/stores/geolocation';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { replaceState } from '$app/navigation';
  import { createQuery } from '@tanstack/svelte-query';
  import { typed_fetch } from '../api/endpoint-types';
  import Itinerary from './Itinerary.svelte';
  import BikeToggle from './BikeToggle.svelte';
  import { Accordion } from 'bits-ui';
  import LoadingCards from '$components/LoadingCards.svelte';
  import * as m from '$lib/paraglide/messages.js';
  import { writable } from 'svelte/store';

  let { data } = $props();

  let locationSetup = $state(!!$page.url.searchParams.get('from'));

  let locationSetupStore = $derived(writable(locationSetup));
  // let bike = $state(false);
  let timeSetting = $state<TimeSelectorProps>({
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    type: 'now',
  });

  onMount(async () => {
    $geolocationPermissionState = (
      await navigator.permissions.query({ name: 'geolocation' })
    ).state;
    listenForPermissionChange();
  });

  $effect(() => {
    if ($geolocationPermissionState === 'granted') loadLocation();
  });

  $effect(() => {
    if (!locationSetup && $location.isLoaded) {
      $page.url.searchParams.set(
        'from',
        $location.position?.coords.latitude +
          ',' +
          $location.position?.coords.longitude,
      );
      replaceState($page.url, history.state);
      locationSetup = true;
      directionsData.refetch();
    }
  });

  // $effect(() => {
  //   if (timeSetting.type !== 'now') {
  //     $page.url.searchParams.set('time', timeSetting.time);
  //     $page.url.searchParams.set('type', timeSetting.type);
  //     replaceState($page.url, history.state);
  //   }
  // });

  const directionsData = createQuery(() => ({
    queryKey: [
      'directions',
      data.to,
      data.to_address,
      $location.position?.coords,
    ],
    queryFn: async () =>
      typed_fetch('/api/directions', {
        from:
          $page.url.searchParams.get('from') ??
          $location.position?.coords?.latitude +
            ',' +
            $location.position?.coords?.longitude,
        to: data.to ?? '',
        to_name: data.to_address || undefined,
        arrive_by: timeSetting.type === 'arrive_at',
        time: timeSetting.type !== 'now' ? timeSetting.time : undefined,
      }),
    enabled: $locationSetupStore,
  }));
</script>

<PageLayout topMargin>
  <div
    class="mb-2 flex flex-col gap-4 rounded p-4 font-light dark:bg-slate-800"
  >
    <div class="flex items-center gap-2">
      {#if locationSetup}
        <LocateFixed />
      {:else}
        <button onclick={() => loadLocation()}>
          <Locate />
        </button>
      {/if}
      <span class="w-full rounded border p-1 dark:border-slate-300"
        >{m.your_current_location()}</span
      >
    </div>
    <div class="flex items-center gap-2">
      <MapPin />
      <a
        href="/search?{new URLSearchParams({
          q: data.to_address || '',
          ...($location.position?.coords && {
            from: `${$location.position?.coords.latitude},${$location.position?.coords.longitude}`,
          }),
        }).toString()}"
        class="w-full rounded border p-1 dark:border-slate-300"
        >{data.to_address}</a
      >
    </div>
    <div class="flex justify-between">
      <TimeSelector bind:timeSetting />
      <!-- <BikeToggle bind:bike /> -->
      <button onclick={() => directionsData.refetch()}>Go</button>
    </div>
  </div>

  {#if directionsData.isLoading}
    <div class="flex flex-col gap-2">
      <LoadingCards numberOfItems={3} />
    </div>
  {/if}

  {#if directionsData.data?.itineraries}
    <Accordion.Root class="flex flex-col gap-2">
      {#each directionsData.data.itineraries as itinerary}
        <Itinerary {itinerary} />
      {/each}
    </Accordion.Root>
  {/if}

  {#if directionsData.isError}
    <pre>{directionsData.error.message}</pre>
  {/if}
</PageLayout>
