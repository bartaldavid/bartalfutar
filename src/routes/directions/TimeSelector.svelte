<script context="module" lang="ts">
  export type TimeSelectorProps = {
    time: string;
    type: 'now' | 'arrive_at' | 'leave_at';
  };
</script>

<script lang="ts">
  let { timeSetting = $bindable() }: { timeSetting: TimeSelectorProps } = $props();
</script>

<div class="flex gap-2 text-sm">
  <select class="bg-transparent p-0.5" bind:value={timeSetting.type}>
    <option value="now">Leave now</option>
    <option value="arrive_at">Arrive by</option>
    <option value="leave_at">Leave at</option>
  </select>
  {#if timeSetting.type !== 'now'}
    <input type="time" class="bg-transparent p-0.5" bind:value={timeSetting.time} />
  {/if}
</div>
