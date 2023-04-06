import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getShows } from "~/api/getShows";
import { links as buttonLinks } from "~/components/Button";
import Card, { links as cardLinks } from "~/components/Card";
import FilterForm, { links as filterFormLinks } from "~/components/FilterForm";
import Header, { links as headerLinks } from "~/components/Header";
import { links as selectLinks } from "~/components/input/Select";
import { links as textLinks } from "~/components/input/Text";
import { links as modalLinks } from "~/components/Modal";
import styles from "~/styles/index.css";
import type { MoviesSeries } from "~/types/moviesSeries";

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

export const loader = async ({ request }: LoaderArgs) => {
  const data: LoaderData = await getShows(request);

  if (data.hasMore) {
    const decodedNextCursor = encodeURIComponent(data.nextCursor);
    const dataNextPage: LoaderData = await getShows(request, decodedNextCursor);
    return {
      ...dataNextPage,
      result: [...data.result, ...dataNextPage.result],
    };
  }

  return data;
};

const Index = () => {
  const data = useLoaderData<LoaderData>();
  const [shows] = React.useState<MoviesSeries[]>(data.result);

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

          <div className="shows-page-container">
            <FilterForm />
            <Card items={shows} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
