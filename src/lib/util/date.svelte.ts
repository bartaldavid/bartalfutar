// FIXME should null cases be handled elsewhere?

import type { components } from '$lib/schema-generated';
import { useNow } from '$lib/stores/now.svelte';

export function epochToDate(epochDate: number | null | undefined): Date | null {
  if (!epochDate) return null;
  const date = new Date(0);
  date.setUTCSeconds(epochDate);
  return date;
}

export function displayDate(date: Date | null | undefined): string {
  if (!date) return '';
  return date.toLocaleTimeString('hu', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

// rewrite this to make it reactive
export function useTransitStopTime(
  transitStopTime:
    | components['schemas']['TransitTripStopTime']
    | components['schemas']['TransitScheduleStopTime'],
) {
  const {
    arrivalTime,
    departureTime,
    predictedArrivalTime,
    predictedDepartureTime,
  } = transitStopTime;

  const time = useNow();

  const isRealtime = !!predictedArrivalTime || !!predictedDepartureTime;
  let relevantDate: Date | null = null;
  let delayInMinutes = 0;
  let isDelayed = false;

  const arrivalDate = epochToDate(arrivalTime);
  const departureDate = epochToDate(departureTime);
  const predictedArrivalDate = epochToDate(predictedArrivalTime);
  const predictedDepartureDate = epochToDate(predictedDepartureTime);

  relevantDate = departureDate || arrivalDate;

  if (isRealtime) {
    relevantDate = predictedDepartureDate || predictedArrivalDate;

    delayInMinutes =
      predictedDepartureTime && departureTime
        ? (predictedDepartureTime - departureTime) / 60
        : 0;

    isDelayed = delayInMinutes >= 1;
  }
  let isDeparted = $derived(
    !relevantDate ? false : relevantDate?.valueOf() <= time.now.valueOf(),
  );

  return {
    relevantDate,
    delayInMinutes,
    isDelayed,
    isRealtime,
    isDeparted,
    arrivalDate,
    departureDate,
    predictedArrivalDate,
    predictedDepartureDate,
  };
}
