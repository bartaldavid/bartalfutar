<script context="module" lang="ts">
  import Train from '~icons/material-symbols/train';
  import Bus from '~icons/material-symbols/directions-bus';
  import Subway from '~icons/material-symbols/subway';
  import Tram from '~icons/material-symbols/tram';
  import ZoomOutMap from '~icons/material-symbols/zoom-out-map';

  type typeMap = {
    [key in components['schemas']['TransitStop']['type'] as string | 'MULTIPLE']?: {
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
    COACH: { icon: Bus, color: '#F9AB13' },
    SUBURBAN_RAILWAY: { icon: Train, color: '#2E5EA8' },
    MULTIPLE: { icon: ZoomOutMap, color: '#94a3b8' }
  };
</script>

<script lang="ts">
  import type { components } from '../lib/data/bkk-openapi';

  let { vehicleType, class: className }: { vehicleType: string; class: string } = $props();
</script>

{#if vehicleType}
  <svelte:component
    this={typesToIconsMap[vehicleType]?.icon}
    class={className}
    style={`color:${typesToIconsMap[vehicleType]?.color};`}
  />
{/if}
