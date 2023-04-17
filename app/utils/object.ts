import { decodeString } from "./string";

export function createQueryParams(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  const queryString = searchParams.toString();

  return decodeString(queryString);
}

export function getQueryStringsFromUrl(url: string) {
  const urlObject = new URL(url);
  const searchParams = urlObject.searchParams;
  return Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
    if (value) {
      if (acc[key]) acc[key] += `,${value}`;
      else acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);
}
