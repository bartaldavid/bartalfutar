// FIXME should null cases be handled elsewhere?

import { derived } from 'svelte/store';
import type { components } from '../data/bkk-openapi';
import { now } from '$lib/stores/now';

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
    minute: '2-digit'
  });
}

export function useTransitStopTime(
  transitStopTime:
    | components['schemas']['TransitStopTime']
    | components['schemas']['TransitScheduleStopTime']
) {
  const { arrivalTime, departureTime, predictedArrivalTime, predictedDepartureTime } =
    transitStopTime;

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
      predictedDepartureTime && departureTime ? (predictedDepartureTime - departureTime) / 60 : 0;

    isDelayed = delayInMinutes >= 1;
  }
  const isDeparted = derived(now, ($now) =>
    !relevantDate ? false : relevantDate?.valueOf() <= $now.valueOf()
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
    predictedDepartureDate
  };
}
