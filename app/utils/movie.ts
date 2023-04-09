import type { MoviesSeries } from "~/types/moviesSeries";

export const isMovie = (movie: MoviesSeries): boolean => {
  return movie.type === "movie";
};
