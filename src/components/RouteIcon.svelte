<script lang="ts">
  import type { RouteIcon } from '$lib/types';
  import { cn } from '$lib/utils';

  export let icon: RouteIcon = {};
  export let size: 'small' | 'normal' = 'normal';
</script>

<span
  style:color={'#' + icon.textColor}
  style:background-color={'#' + icon.color}
  class={cn(
    'rounded p-1 text-sm font-semibold',
    !icon.color && 'border',
    size === 'small' && 'text-xs'
  )}
  {...$$restProps}
>
  {icon.text}
</span>
