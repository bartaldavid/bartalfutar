<script lang="ts">
  import RouteIcon from '$components/RouteIcon.svelte';
  import type { Directions } from '../api/directions/+server';
  import DirectionsWalk from '~icons/material-symbols/directions-walk';

  let { legs }: { legs: NonNullable<Directions['itineraries']>[number]['legs'] } = $props();
</script>

<div class="flex gap-1">
  {#each legs as leg, i}
    {#if leg.mode === 'WALK' && legs[i - 1]?.mode !== 'WALK'}
      <DirectionsWalk />
    {:else if leg.route?.text}
      <RouteIcon icon={leg.route} size="small" />
    {/if}
  {/each}
</div>
