<script lang="ts">
  import { now } from '$lib/stores/now';

  export let countDownToDate: Date;
  export let showApostrophe = false;

  function countdown(date: Date, now: Date) {
    const distance = date.getTime() - now.getTime();

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
</script>

<span>{countdown(countDownToDate, $now)}</span>
