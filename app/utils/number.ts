export function convertRuntimeToHoursAndMinutes(
  runtimeInSecondsString: string
) {
  const runtimeInSeconds = parseInt(runtimeInSecondsString, 10);
  const hours = Math.floor(runtimeInSeconds / 3600);
  const minutes = Math.floor((runtimeInSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}
