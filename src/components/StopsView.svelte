<script lang="ts">
	import type { components } from '../data/bkk-openapi';
	import { type savedStop, savedStops } from '../data/stores';
	import SavedStopGroup from './SavedStopGroup.svelte';

	type savedStopGroup = {
		[key in components['schemas']['TransitStop']['type'] as string]: savedStop[];
	};

	let savedStopGroups: savedStopGroup;

	$: savedStopGroups = $savedStops.reduce((result, currentStop) => {
		if (currentStop.type) {
			(result[currentStop.type] = result[currentStop.type] || []).push(currentStop);
		}
		return result;
	}, {} as savedStopGroup);
</script>

{#each Object.entries(savedStopGroups) as [groupType, groupItems]}
	<SavedStopGroup {groupType} {groupItems} on:stopSelected />
{/each}
