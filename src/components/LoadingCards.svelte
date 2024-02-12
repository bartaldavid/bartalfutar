<script lang="ts">
  import { cn } from '$lib/utils';
  import type { HTMLAttributes } from 'svelte/elements';
  export let numberOfItems = 1;

  type $$Props = HTMLAttributes<HTMLDivElement> & {
    numberOfItems?: number;
  };

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

{#each Array(numberOfItems) as _}
  <div
    class={cn('h-24 animate-pulse rounded bg-slate-100 dark:bg-slate-800', className)}
    {...$$restProps}
  ></div>
{/each}
