<script lang="ts">
  import type { RouteIcon } from '$lib/types';

  export let icon: RouteIcon = {};
  export let size: 'small' | 'normal' = 'normal';
</script>

<span
  style:color={'#' + icon.textColor}
  style:background-color={'#' + icon.color}
  class={['rounded p-1 text-sm', !icon.color && 'border', size === 'small' && 'text-xs'].join(' ')}
  {...$$restProps}
>
  {icon.text}
</span>
