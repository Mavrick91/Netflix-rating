export function convertRuntimeToHoursAndMinutes(runtimeInMinutes: number) {
  const hours = Math.floor(runtimeInMinutes / 60);
  const minutes = runtimeInMinutes % 60;
  return `${hours}h ${minutes}m`;
}

export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) {
    return 0;
  }

  const sum = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  return sum / numbers.length;
}
