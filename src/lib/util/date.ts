// FIXME should null cases be handled elsewhere?

import type { components } from '../../data/bkk-openapi';

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
  let relevantDate = null;
  let delayInMinutes = 0;
  let isDelayed = false;
  let isDeparted = false;

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

    isDeparted = !!predictedDepartureDate && predictedDepartureDate.valueOf() < Date.now();
  }

  return {
    relevantDate,
    delayInMinutes,
    isDelayed,
    isRealtime,
    arrivalDate,
    departureDate,
    predictedArrivalDate,
    predictedDepartureDate,
    isDeparted
  };
}
