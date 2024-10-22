<script lang="ts">
  import { cn } from '$lib/utils';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement> & {
    numberOfItems?: number;
  };

  let { numberOfItems = 1, ...rest }: Props = $props();
</script>

{#each Array(numberOfItems) as _}
  <div
    class={cn(
      'h-24 animate-pulse rounded bg-slate-100 dark:bg-slate-800',
      rest.class,
    )}
    {...rest}
  ></div>
{/each}
