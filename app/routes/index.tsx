import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { getShows } from "~/api/getShows";
import { links as buttonLinks } from "~/components/Button";
import Card, { links as cardLinks } from "~/components/Card";
import FilterForm, { links as filterFormLinks } from "~/components/FilterForm";
import GradientHeader, {
  links as gradientHeaderLinks,
} from "~/components/GradientHeader";
import Header, { links as headerLinks } from "~/components/Header";
import { links as selectLinks } from "~/components/input/Select";
import { links as textLinks } from "~/components/input/Text";
import { links as modalLinks } from "~/components/Modal";
import SortableList, {
  links as sortableLinks,
} from "~/components/SortableList";
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
  ...sortableLinks(),
  ...gradientHeaderLinks(),
  { rel: "stylesheet", href: styles },
];

type LoaderData = {
  result: MoviesSeries[];
  hasMore: boolean;
  nextCursor: string;
};

export type SoterOptions = {
  year: number[];
  other: string;
};

const fetchPage = async (
  url: string,
  nextCursor?: string,
  signal?: AbortSignal
) => {
  const data: LoaderData = await getShows(url, nextCursor, { signal });

  return data;
};

export const loader = async ({ request }: LoaderArgs) => {
  return fetchPage(request.url);
};

const Index = () => {
  const dataFromServer = useLoaderData<LoaderData>();
  const [data, setData] = useState<LoaderData>(dataFromServer);
  const [page, setPage] = useState(1);
  const [sorterOptions, setSorterOptions] = useState<SoterOptions>({
    year: [],
    other: "",
  });
  const queryClient = useQueryClient();

  const prefetchShows = useCallback(async () => {
    await queryClient.prefetchQuery({
      queryKey: [data.nextCursor],
      queryFn: ({ signal }) =>
        fetchPage(window.location.href, data.nextCursor, signal).then(
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
    if (data.hasMore) prefetchShows().then();
  }, [data.hasMore, page, prefetchShows]);

  const sortShows = useMemo(() => {
    let sortedShows = data.result;

    if (sorterOptions.year.length > 0) {
      sortedShows = data.result.filter((show) =>
        sorterOptions.year.includes(show.year)
      );
    }

    if (sorterOptions.other) {
      if (sorterOptions.other === "originalTitle")
        sortedShows = sortedShows.sort((a, b) =>
          a.originalTitle.localeCompare(b.originalTitle)
        );
      if (sorterOptions.other === "imdbRating") {
        sortedShows = sortedShows.sort((a, b) => b.imdbRating - a.imdbRating);
      }
      if (sorterOptions.other === "imdbVoteCount") {
        sortedShows = sortedShows.sort(
          (a, b) => b.imdbVoteCount - a.imdbVoteCount
        );
      }
    }
    return sortedShows;
  }, [data.result, sorterOptions.other, sorterOptions.year]);

  const getShowsToDisplay = useMemo(() => {
    const itemsPerPage = 12;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return sortShows.slice(startIndex, endIndex);
  }, [sortShows, page]);

  const nextPageLength = useMemo(() => {
    const itemsPerPage = 12;
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return sortShows.slice(startIndex, endIndex).length;
  }, [page, sortShows]);

  return (
    <>
      <Header />
      <main>
        <div className="radial-background" />
        <section className="container">
          <GradientHeader>
            The Ultimate Movie Rating
            <br /> Database and Review Site
          </GradientHeader>

          <div className="shows-page-container">
            <FilterForm cancelQueries={cancelPrefetch} />
            <div>
              <SortableList setSorterOptions={setSorterOptions} />
              <Card
                items={getShowsToDisplay}
                setPage={setPage}
                hasNextPage={nextPageLength >= 1}
                page={page}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
