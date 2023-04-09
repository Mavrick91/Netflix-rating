import customFetch from "~/api/fetch";
import { createQueryParams, getQueryStringsFromUrl } from "~/utils/object";

const defaultQueryString = {
  country: "us",
  services: "netflix,prime.buy,hulu",
};

type Params = {
  country: string;
  services: string;
  output_language?: string;
  show_type?: string;
  genre?: string;
  show_original_language?: string;
  cursor?: string;
  keyword?: string;
};
export const getShows = async (url: string, decodedNextCursor?: string) => {
  const queryParams = getQueryStringsFromUrl(url);
  const params: Params = {
    ...defaultQueryString,
    ...queryParams,
  };
  if (decodedNextCursor) {
    params.cursor = decodedNextCursor;
  }

  const queryString = createQueryParams(params);

  const response = await customFetch(`/search/basic?${queryString}`);

  if (!response.ok) {
    throw new Error("Could not fetch data");
  }

  return await response.json();
};
