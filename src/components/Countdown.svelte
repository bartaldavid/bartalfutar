<script module lang="ts">
  function countdown(date: Date, now: number, showApostrophe: boolean) {
    const distance = date.getTime() - now;

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (hours > 0) return `${hours}h ${minutes}`;
    if (minutes >= 10) return `${minutes}${showApostrophe ? "'" : ''}`;
    if (minutes < -1) return `${minutes + 1}'`;
    if (minutes <= 0) return `${seconds} s`;
    return `${minutes}:${seconds.toLocaleString('hu', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`;
  }
</script>

<script lang="ts">
  import { useNow } from '$lib/stores/now.svelte.js';
  import type { HTMLAttributes } from 'svelte/elements';

  let {
    countDownToDate,
    showApostrophe = false,
    ...rest
  }: {
    countDownToDate: Date;
    showApostrophe?: boolean;
  } & HTMLAttributes<HTMLSpanElement> = $props();

  const now = useNow();

  let coundownString = $derived(
    countdown(countDownToDate, now.now.valueOf(), showApostrophe),
  );
</script>

<span {...rest}>{coundownString}</span>
