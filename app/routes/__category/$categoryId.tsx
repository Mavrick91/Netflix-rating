import { useLoaderData } from "@remix-run/react";
import customFetch from "~/api/fetch";
import Card from "~/components/Card";
import type { MoviesSeries } from "~/types/moviesSeries";
import { createQueryParams } from "~/utils/object";

type LoaderData = MoviesSeries[];
export const loader = async ({ params }) => {
  const queryString = createQueryParams({
    type: params.categoryId === "movies" ? "movie" : "series",
  });
  const response = await customFetch.apilayer(`/search/titles?${queryString}`);
  if (!response.ok) {
    throw new Error("Could not fetch data");
  }
  const data = await response.json();
  const MoviesSeriesListItem: LoaderData = data.results;
  return MoviesSeriesListItem;
};

const CategoryPage = () => {
  const MoviesSeriesListItem = useLoaderData<LoaderData>();

  return <Card items={MoviesSeriesListItem} />;
};

export default CategoryPage;
