import type { LoaderArgs } from "@remix-run/node";
import customFetch from "~/api/fetch";
import Button, { links as buttonLinks } from "~/components/Button";
import Card, { links as cardLinks } from "~/components/Card";
import Header, { links as headerLinks } from "~/components/Header";
import Select, { links as selectLinks } from "~/components/input/Select";
import { supportedCountries } from "~/constants/supportedCountries";

import styles from "~/styles/index.css";
import type { MoviesSeries } from "~/types/moviesSeries";
import { createQueryParams } from "~/utils/object";
import Text, { links as textLinks } from "~/components/input/Text";
import { useLoaderData, useParams } from "@remix-run/react";
import { useMemo } from "react";

export const links = () => [
  ...headerLinks(),
  ...buttonLinks(),
  ...textLinks(),
  ...selectLinks(),
  ...cardLinks(),
  { rel: "stylesheet", href: styles },
];

type LoaderData = {
  result: MoviesSeries[];
  hasMore: boolean;
  nextCursor: string;
};
export const loader = async ({ params, request }: LoaderArgs) => {
  const queryString = createQueryParams({
    country: "us",
    services: "netflix,prime.buy,hulu",
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
  const { categoryId } = useParams();

  const placeholderText = useMemo(() => {
    let placeholder = "Find a movie or series ...";

    if (categoryId === "movies") {
      placeholder = "Find a movie ...";
    } else if (categoryId === "show-tv") {
      placeholder = "Find a series ...";
    }

    return placeholder;
  }, [categoryId]);

  const selectItems = useMemo(
    () => [
      { value: "english", label: "English" },
      { value: "spanish", label: "Spanish" },
      { value: "french", label: "French" },
    ],
    []
  );

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
            <form className="category-filter-form">
              <Select label="Audio" items={selectItems} />
              <Select label="Country" items={supportedCountries} />
              <Text label="Title" placeholder={placeholderText} />
              <div />
              <Button>Filter</Button>
            </form>
            <Card items={data.result} />;
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
