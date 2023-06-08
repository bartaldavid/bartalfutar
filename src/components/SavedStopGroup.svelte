<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { components } from '../data/bkk-openapi';
	import VehicleIcons from './VehicleIcons.svelte';
	import { goto } from '$app/navigation';

	export let groupType: string;
	export let groupItems: components['schemas']['TransitStop'][];

	const dispatch = createEventDispatcher<{
		stopSelected: { id: string };
	}>();
</script>

<div class="flex flex-row rounded bg-slate-50 p-2 dark:bg-slate-800">
	<div class="flex">
		<VehicleIcons vehicleType={groupType} />
	</div>
	<div class="flex flex-wrap gap-1">
		<!-- TODO separate this into its own stop component? -->
		{#each groupItems as stop (stop.id)}
			<button
				class="flex-1 break-words rounded bg-slate-100 p-2 text-sm dark:bg-slate-700 dark:text-slate-50"
				on:click={() => {
					stop.id && goto(`/stops/${stop.id}`);
				}}
				>{stop.name}
			</button>
		{/each}
	</div>
</div>
