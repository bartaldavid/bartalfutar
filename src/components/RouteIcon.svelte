<script lang="ts">
  import type { RouteIcon } from '$lib/types';
  import { cn } from '$lib/utils';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLSpanElement> & {
    icon?: RouteIcon;
    size?: 'small' | 'normal';
  };

  let { icon = {}, size = 'normal', ...props }: Props = $props();
</script>

<span
  style:color={'#' + icon.textColor}
  style:background-color={'#' + icon.color}
  class={cn(
    'rounded p-1 text-sm font-semibold',
    !icon.color && 'border border-slate-600 dark:border-slate-400',
    size === 'small' && 'text-xs',
  )}
  {...props}
>
  {icon.text}
</span>
