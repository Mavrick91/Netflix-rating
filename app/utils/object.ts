export function createQueryParams(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  const queryString = searchParams.toString();
  return queryString;
}

export function getQueryStringsFromUrl(url: string) {
  const urlObject = new URL(url);
  const searchParams = urlObject.searchParams;
  const queryStrings = Array.from(searchParams.entries()).reduce(
    (acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );

  return queryStrings;
}
