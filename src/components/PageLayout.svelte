<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    pageTitle = '',
    header,
    children,
    topMargin = false,
  }: {
    pageTitle?: string;
    topMargin?: boolean;
    header?: Snippet;
    children?: Snippet;
  } = $props();
</script>

<div
  class="mb-24 flex w-full flex-col md:w-80 dark:text-white {topMargin
    ? 'mt-12'
    : ''}"
>
  {#if pageTitle}
    <div class="mt-12 mb-4 flex items-center justify-between">
      <h1 class="text-lg dark:text-white">{pageTitle}</h1>
      {#if header}
        {@render header()}
      {/if}
    </div>
  {/if}
  {#if children}
    {@render children()}
  {/if}
</div>
