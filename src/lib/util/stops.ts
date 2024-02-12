export function isMav(stopId: string) {
  const stopParts = stopId.split('_');
  return stopParts.length === 3 && stopParts[2] === '0';
}
