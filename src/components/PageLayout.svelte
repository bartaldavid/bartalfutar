<script>
  export let pageTitle = '';
</script>

<div class="mb-24 flex w-full flex-col md:w-72">
  <div class="mb-4 mt-12 flex items-center justify-between">
    <h1 class="text-2xl dark:text-white">{pageTitle}</h1>
    <slot name="header" />
  </div>
  <slot name="content">No content</slot>
</div>
