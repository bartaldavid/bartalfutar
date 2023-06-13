<script lang="ts">
	import type { components, operations } from '../data/bkk-openapi';

	import Countdown from './Countdown.svelte';
	import TripDetails from './TripDetails.svelte';
	import { epochToDate, displayDate } from '../util/dateMagic';
	import { createEventDispatcher, onMount } from 'svelte';

	export let departure: components['schemas']['TransitScheduleStopTime'] = {};
	export let references: components['schemas']['OTPTransitReferences'] = {};
	export let expandedTripId: string;
	export let expandable: boolean;

	const dispatch = createEventDispatcher();

	const routeId = references?.trips?.[departure?.tripId!]?.routeId;
	const routeData = references?.routes?.[routeId!];

	$: predictedDepartureDate = epochToDate(departure.predictedDepartureTime);
	$: departureDate = epochToDate(departure.departureTime);

	$: countDownToDate =
		predictedDepartureDate ?? departureDate ?? epochToDate(departure.predictedArrivalTime);

	const delayInMinutes =
		departure.predictedDepartureTime && departure.departureTime
			? (departure?.predictedDepartureTime - departure?.departureTime) / 60
			: 0;

	async function toggleDetails() {
		if (expandedTripId !== departure.tripId && departure.tripId) {
			dispatch('expand', { id: departure.tripId });
		} else {
			dispatch('collapse');
		}
	}
</script>

<div
	class="flex w-full flex-col rounded bg-slate-100 p-4 hover:cursor-pointer dark:bg-slate-800 dark:text-slate-50"
	on:click={() => expandable && toggleDetails()}
	on:keypress={() => {}}
>
	<div class="flex justify-between gap-6">
		<div>
			<span>{displayDate(departureDate)}</span>
			{#if departure.predictedDepartureTime}
				<span
					class={delayInMinutes > 1
						? 'text-red-500 dark:text-red-400'
						: 'text-green-500 dark:text-green-400'}
				>
					{displayDate(predictedDepartureDate)}
				</span>
				{#if delayInMinutes > 1}
					<span class="text-xstext-red-500 dark:text-red-400">(+{delayInMinutes.toFixed(1)})</span>
				{/if}
			{/if}

			<div class="my-1 text-sm">
				<span
					style:color={'#' + routeData?.style?.icon?.textColor}
					style:background-color={'#' + routeData?.style?.color}
					class="rounded p-1"
				>
					{routeData?.shortName}
				</span>
				<span class="text-sm">{departure.stopHeadsign}</span>
			</div>
			{#if departure.alertIds}
				{#each departure.alertIds as alertId}
					<div class="mt-2 text-xs text-red-500 dark:text-red-400">
						{references?.alerts?.[alertId]?.header?.someTranslation}
					</div>
				{/each}
			{/if}
		</div>

		{#if countDownToDate}
			<Countdown {countDownToDate} />
		{/if}

		<!-- TODO show icon to indicate expandable behaviour -->
	</div>

	{#if expandedTripId === departure.tripId}
		<TripDetails tripId={departure.tripId} />
	{/if}
</div>
