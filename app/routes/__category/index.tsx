import { useLoaderData } from "@remix-run/react";
import customFetch from "~/api/fetch";
import Card from "~/components/Card";
import type { MoviesSeries } from "~/types/moviesSeries";

const params = new URLSearchParams({
  order_by: "date",
});
const queryString = params.toString();

type LoaderData = MoviesSeries[];
export const loader = async () => {
  const response = await customFetch.apilayer(`/search/titles?${queryString}`);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch movies or series.");
  }

  const MoviesSeriesListItem: LoaderData = data.results;

  return MoviesSeriesListItem;
};

const CategoryIndex = () => {
  const MoviesSeriesListItem = useLoaderData<LoaderData>();

  return <Card items={MoviesSeriesListItem} />;
};

export default CategoryIndex;
