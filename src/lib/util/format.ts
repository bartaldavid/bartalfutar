export function formatDuration(durationInMinutes: number): string {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  const formattedHours = hours > 0 ? `${hours} h` : '';
  const formattedMinutes = minutes > 0 ? `${minutes} m` : '';

  return `${formattedHours} ${formattedMinutes}`.trim();
}
