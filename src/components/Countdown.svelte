<script lang="ts">
	export let countDownToDate: Date;
	export let isShort: boolean = false;
	let [hoursC, minutesC, secondsC] = countdown(countDownToDate);

	function countdown(date: Date): number[] {
		const now = new Date().getTime();
		const distance = date.valueOf() - now;

		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);

		return [hours, minutes, seconds];
	}

	setInterval(() => {
		[hoursC, minutesC, secondsC] = countdown(countDownToDate);
	}, 1000);

	function displayCountdown([h, m, s]: number[]): string {
		if (h > 0) return `${h}h ${m}`;
		if (m > 10) return m.toString();
		if (m < 0) return `${s} s`;
		return `${m}:${s.toLocaleString('hu', {
			minimumIntegerDigits: 2,
			useGrouping: false
		})}`;
	}
</script>

<div class="flex flex-col justify-center text-center">
	<div>{displayCountdown([hoursC, minutesC, secondsC])}</div>
	{#if !isShort}
	<div class="text-xs text-slate-700 dark:text-slate-100">perc múlva</div>
	{/if}
</div>
