import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
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

const fetch2PagesPer2Pages = async (url: string, nextCursor?: string) => {
  const data: LoaderData = await getShows(url, nextCursor);
  if (data.hasMore) {
    const decodedNextCursor = encodeURIComponent(data.nextCursor);
    const dataNextPage: LoaderData = await getShows(url, decodedNextCursor);
    return {
      ...dataNextPage,
      result: [...data.result, ...dataNextPage.result],
    };
  }
  return data;
};

export const loader = async ({ request }: LoaderArgs) => {
  return fetch2PagesPer2Pages(request.url);
};

const Index = () => {
  const dataFromServer = useLoaderData<LoaderData>();
  const [data, setData] = useState<LoaderData>(dataFromServer);
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const prefetchShows = useCallback(async () => {
    await queryClient.prefetchQuery({
      queryKey: [data.nextCursor],
      queryFn: () =>
        fetch2PagesPer2Pages(window.location.href, data.nextCursor).then(
          (res: LoaderData) => {
            setData((prevData: any) => {
              return {
                result: [...prevData.result, ...res.result],
                hasMore: res.hasMore,
                nextCursor: res.nextCursor,
              };
            });
          }
        ),
    });
  }, [data.nextCursor, queryClient]);

  const cancelPrefetch = useCallback(async () => {
    await queryClient.cancelQueries();
  }, [queryClient]);

  useEffect(() => {
    setData(dataFromServer);
    setPage(1);
  }, [dataFromServer]);

  useEffect(() => {
    if (data.hasMore) prefetchShows();
  }, [data.hasMore, page, prefetchShows]);

  const getShowsToDisplay = useMemo(() => {
    const itemsPerPage = 12;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data.result.slice(startIndex, endIndex);
  }, [data.result, page]);

  const nextPageLength = useMemo(() => {
    const itemsPerPage = 12;
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data.result.slice(startIndex, endIndex).length;
  }, [data.result, page]);

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
            <FilterForm cancelQueries={cancelPrefetch} />
            <Card
              items={getShowsToDisplay}
              setPage={setPage}
              hasNextPage={nextPageLength >= 1}
              page={page}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
