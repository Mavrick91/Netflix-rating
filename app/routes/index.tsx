import type { LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import customFetch from "~/api/fetch";
import undoArrow from "~/assets/icons/undo-arrow.png";
import Button, { links as buttonLinks } from "~/components/Button";
import Card, { links as cardLinks } from "~/components/Card";
import Header, { links as headerLinks } from "~/components/Header";
import Select, { links as selectLinks } from "~/components/input/Select";
import Text, { links as textLinks } from "~/components/input/Text";
import {
  genresShow,
  languageShow,
  showTypes,
  supportedCountries,
} from "~/constants/filterConstants";
import styles from "~/styles/index.css";
import type { MoviesSeries } from "~/types/moviesSeries";
import { createQueryParams, getQueryStringsFromUrl } from "~/utils/object";
import { links as modalLinks } from "~/components/Modal";

export const links = () => [
  ...headerLinks(),
  ...buttonLinks(),
  ...textLinks(),
  ...selectLinks(),
  ...cardLinks(),
  ...modalLinks(),
  { rel: "stylesheet", href: styles },
];

type LoaderData = {
  result: MoviesSeries[];
  hasMore: boolean;
  nextCursor: string;
};
export const loader = async ({ request }: LoaderArgs) => {
  const queryParams = getQueryStringsFromUrl(request.url);
  const queryString = createQueryParams({
    country: "us",
    services: "netflix,prime.buy,hulu",
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
            <Form className="category-filter-form">
              <Select
                label="Type"
                name="show_type"
                items={showTypes}
                defaultValue={showTypes[0].value}
              />
              <Select
                label="Language"
                name="show_original_language"
                defaultValue={languageShow[0].value}
                items={languageShow}
              />
              <Select
                label="Available in country"
                name="country"
                items={supportedCountries}
                defaultValue="us"
              />
              <Select
                label="Genre"
                name="genre"
                items={genresShow}
                defaultValue="us"
              />
              <Text
                label="Find by keyword"
                name="keyword"
                placeholder="Search shows by keyword"
              />
              <Button type="submit">Filter</Button>
              <Button type="reset">
                <img src={undoArrow} alt="Icon undo" />
              </Button>
              <div />
            </Form>
            <Card items={data.result} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
