<script lang="ts">
	import type { components } from '../data/bkk-openapi';
	import Departure from './Departure.svelte';

	export let departures: components['schemas']['TransitScheduleStopTime'][] = [];
	export let references: components['schemas']['OTPTransitReferences'] = {};
	export let expandable = false;

	let expandedTripId = '';
</script>

{#each departures as departure (crypto.randomUUID())}
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
{/each}
