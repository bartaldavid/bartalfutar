// FIXME should null cases be handled elsewhere?

export function epochToDate(epochDate: number | null | undefined): Date | null {
  if (epochDate === undefined || epochDate === null) return null;
  let date = new Date(0);
  date.setUTCSeconds(epochDate);
  return date;
}

export function displayDate(date: Date | null): string {
  if (date === null) return "";
  return date.toLocaleTimeString("hu", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
