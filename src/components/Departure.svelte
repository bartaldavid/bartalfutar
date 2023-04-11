<script lang="ts">
	import type { components, operations } from '../data/bkk-openapi';

	import Countdown from './Countdown.svelte';
	import TripDetails from './TripDetails.svelte';
	import { epochToDate, displayDate } from '../util/dateMagic';
	import { createEventDispatcher, onMount } from 'svelte';

	export let departure: components['schemas']['TransitScheduleStopTime'] = {};
	export let references: components['schemas']['OTPTransitReferences'] = {};
	export let expandedTripId: string;

	const dispatch = createEventDispatcher();

	type tripDetailResponse = {
		loading: boolean;
		error: string;
		data: components['schemas']['TransitEntryWithReferencesTransitTripDetailsOTP'];
	};

	let tripRef: components['schemas']['TransitReferences'];
	let tripData: components['schemas']['TransitTripDetailsOTP'];

	const routeId = references?.trips?.[departure?.tripId!]?.routeId;
	const routeData = references?.routes?.[routeId!];

	const predictedDepartureDate = epochToDate(departure.predictedDepartureTime);
	const departureDate = epochToDate(departure.departureTime);

	// FIXME not a valid fallback
	const countDownToDate = predictedDepartureDate ?? departureDate ?? new Date();

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
	on:click={toggleDetails}
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
				{#if delayInMinutes > 0.5}
					<span
						class="text-xs {delayInMinutes > 1
							? 'text-red-500 dark:text-red-400'
							: 'text-green-500 dark:text-green-400'}">(+{delayInMinutes.toFixed(1)})</span
					>
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
		<div class="flex flex-col justify-center text-center">
			<Countdown {countDownToDate} />
			<div class="text-xs text-slate-700 dark:text-slate-100">perc múlva</div>
		</div>
	</div>

	{#if expandedTripId === departure.tripId}
		<TripDetails tripId={departure.tripId} />
	{/if}
</div>
