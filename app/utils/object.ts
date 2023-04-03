export function createQueryParams(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  const queryString = searchParams.toString();
  return queryString;
}
