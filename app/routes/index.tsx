import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import customFetch from "~/api/fetch";
import { links as buttonLinks } from "~/components/Button";
import Card, { links as cardLinks } from "~/components/Card";
import FilterForm, { links as filterFormLinks } from "~/components/FilterForm";
import Header, { links as headerLinks } from "~/components/Header";
import { links as selectLinks } from "~/components/input/Select";
import { links as textLinks } from "~/components/input/Text";
import { links as modalLinks } from "~/components/Modal";
import styles from "~/styles/index.css";
import type { MoviesSeries } from "~/types/moviesSeries";
import { createQueryParams, getQueryStringsFromUrl } from "~/utils/object";

export const links = () => [
  ...headerLinks(),
  ...buttonLinks(),
  ...textLinks(),
  ...selectLinks(),
  ...cardLinks(),
  ...modalLinks(),
  ...filterFormLinks(),
  { rel: "stylesheet", href: styles },
];

type LoaderData = {
  result: MoviesSeries[];
  hasMore: boolean;
  nextCursor: string;
};

const defaultQueryString = {
  country: "us",
  services: "netflix,prime.buy,hulu",
};

export const loader = async ({ request }: LoaderArgs) => {
  const queryParams = getQueryStringsFromUrl(request.url);
  const queryString = createQueryParams({
    ...defaultQueryString,
    ...queryParams,
  });

  const response = await customFetch(`/search/basic?${queryString}`);
  if (!response.ok) {
    throw new Error("Could not fetch data");
  }

  return await response.json();
};

const Index = () => {
  const data = useLoaderData<LoaderData>();
  console.log("🚀 ~ data:", data);

  return (
    <>
      <Header />
      <main>
        <section className="inner-container">
          <div className="centered-heading-container">
            <h1 className="heading">
              The Ultimate Movie Rating Database and Review Site
            </h1>
          </div>

          <div className="category-page-container">
            <FilterForm />
            <Card items={data.result} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
