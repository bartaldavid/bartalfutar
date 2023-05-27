<script lang="ts">
	import type { components } from '../data/bkk-openapi';
	import Departure from './Departure.svelte';

	export let departures: components['schemas']['TransitScheduleStopTime'][] = [];
	export let references: components['schemas']['OTPTransitReferences'] = {};
	export let expandable = false;

	let expandedTripId = '';
</script>

<!-- TODO if in searchview: show more -> link to departures/[stopId] -->
{#each departures as departure (departure.tripId)}
	<Departure
		{departure}
		{references}
		{expandedTripId}
		{expandable}
		on:collapse={() => {
			expandedTripId = '';
		}}
		on:expand={(event) => {
			expandedTripId = event.detail.id;
		}}
	/>
{:else}
	<div class="flex flex-col items-center justify-center w-full h-12">
		<!-- FIXME 90 should be a variable grabbed from the request -->
		<span class="text-gray-200">No departure in the next 90 minutes</span>
	</div>
{/each}
