<script lang="ts">
  import BikeDirection from '~icons/material-symbols/directions-bike';
  import PedalBike from '~icons/material-symbols/pedal-bike';
  let { bike = $bindable(false) }: { bike: boolean | 'BUBI' } = $props();

  const bikeOptions = [false, true, 'BUBI'] as const;
</script>

<button
  onclick={() =>
    (bike = bikeOptions[(bikeOptions.indexOf(bike) + 1) % bikeOptions.length])}
>
  {#if bike === 'BUBI'}
    <PedalBike />
  {:else if bike}
    <BikeDirection />
  {:else}
    <BikeDirection class="text-slate-500" />
  {/if}
</button>
