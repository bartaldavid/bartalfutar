<script>
  export let pageTitle = '';
</script>

<div class="mb-24 flex w-full flex-col dark:text-white md:w-72">
  {#if pageTitle}
    <div class="mb-4 mt-12 flex items-center justify-between">
      <h1 class="text-xl dark:text-white">{pageTitle}</h1>
      <slot name="header" />
    </div>
  {/if}
  <slot name="content">No content</slot>
</div>
