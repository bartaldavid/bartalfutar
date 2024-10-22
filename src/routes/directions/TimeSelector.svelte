<script module lang="ts">
  export type TimeSelectorProps = {
    time: string;
    type: 'now' | 'arrive_at' | 'leave_at';
  };
</script>

<script lang="ts">
  import * as m from '$lib/paraglide/messages.js';
  let { timeSetting = $bindable() }: { timeSetting: TimeSelectorProps } =
    $props();
</script>

<div class="flex gap-2 text-sm">
  <select class="bg-transparent p-0.5" bind:value={timeSetting.type}>
    <option value="now">{m.leave_now()}</option>
    <option value="arrive_at">{m.arrive_by()}</option>
    <option value="leave_at">{m.leave_at()}</option>
  </select>
  {#if timeSetting.type !== 'now'}
    <input
      type="time"
      class="bg-transparent p-0.5"
      bind:value={timeSetting.time}
    />
  {/if}
</div>
