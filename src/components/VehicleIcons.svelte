<script lang="ts">
  import type { SvelteComponent, SvelteComponentTyped } from 'svelte';
  import type { components } from '../data/bkk-openapi';
  import Train from '~icons/material-symbols/train';
  import Bus from '~icons/material-symbols/directions-bus';
  import Subway from '~icons/material-symbols/subway';
  import Tram from '~icons/material-symbols/tram';

  export let vehicleType: string;

  type typeMap = {
    [key in components['schemas']['TransitStop']['type'] as string]?: {
      icon: any; // FIXME
      color: string;
    };
  };

  export const typesToIconsMap: typeMap = {
    RAIL: { icon: Train, color: '#2E5EA8' },
    BUS: { icon: Bus, color: '#009EE3' },
    SUBWAY: { icon: Subway, color: '#005ca5' },
    TRAM: { icon: Tram, color: '#FFD800' },
    TROLLEYBUS: { icon: Bus, color: '#009EE3' },
    COACH: { icon: Bus, color: '#009EE3' },
    SUBURBAN_RAILWAY: { icon: Train, color: '#2E5EA8' }
  };
</script>

{#if vehicleType}
  <!-- <span
    class="material-symbols-outlined ml-1 self-center pr-3"
    style:color={typesToIconsMap[vehicleType]?.color}
  >
    {typesToIconsMap[vehicleType]?.icon}
  </span> -->

  <!-- <svelte:component
    this={typesToIconsMap[vehicleType]?.icon}
    style:color={typesToIconsMap[vehicleType]?.color}
    class="text-base ml-1 self-center pr-3"
    /> -->

  <svelte:component
    this={typesToIconsMap[vehicleType]?.icon}
    class=" ml-1 self-center pr-3 text-3xl"
    style={`color:${typesToIconsMap[vehicleType]?.color};`}
  />
{/if}
