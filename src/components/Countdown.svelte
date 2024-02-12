<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  export let countDownToDate: Date;
  export let showApostrophe = false;

  type $$Props = HTMLAttributes<HTMLSpanElement> & {
    countDownToDate: Date;
    showApostrophe?: boolean;
  };

  function countdown(date: Date, now: number) {
    const distance = date.getTime() - now;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (hours > 0) return `${hours}h ${minutes}`;
    if (minutes >= 10) return `${minutes}${showApostrophe ? "'" : ''}`;
    if (minutes <= 0) return `${seconds} s`;
    return `${minutes}:${seconds.toLocaleString('hu', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })}`;
  }

  let coundownString = countdown(countDownToDate, Date.now());

  setInterval(() => {
    coundownString = countdown(countDownToDate, Date.now());
  }, 1000);
</script>

<span {...$$restProps}>{coundownString}</span>
