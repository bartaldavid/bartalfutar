<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import type { components } from '../data/bkk-openapi';
	import { epochToDate, displayDate } from '../util/dateMagic';
	import { fetchTripDetails } from '../util/fetch';
	import { onDestroy } from 'svelte';

	export let tripId: string;

	const tripData = createQuery({
		queryKey: ['trip', tripId],
		// refetchInterval: 1000,
		queryFn: async () => await fetchTripDetails(tripId)
		// enabled: false
	});

	onDestroy(() => $tripData.remove());
</script>

<div class="mt-2 flex flex-col text-sm">
	{#if $tripData.data?.entry?.stopTimes?.length}
		{#each $tripData.data?.entry?.stopTimes as stopTime}
			{@const estimatedDepArr = epochToDate(
				stopTime.predictedDepartureTime ?? stopTime.predictedArrivalTime
			)}
			<div
				class="flex flex-row"
				class:text-gray-500={estimatedDepArr && estimatedDepArr < new Date()}
			>
				<span class="pr-2">
					{displayDate(
						epochToDate(
							stopTime.predictedDepartureTime ??
								stopTime.predictedArrivalTime ??
								stopTime.departureTime ??
								stopTime.arrivalTime
						)
					)}
				</span>
				<span>
					{stopTime.stopId ? $tripData?.data?.references?.stops?.[stopTime?.stopId]?.name : ''}
				</span>
			</div>
		{/each}
	{/if}
</div>
