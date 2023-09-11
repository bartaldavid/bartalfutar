<script>
  export let numberOfItems = 1;
</script>

{#each Array(numberOfItems) as _}
  <div class="h-24 animate-pulse bg-slate-100 dark:bg-slate-800 {$$restProps} rounded"></div>
{/each}
