import type { MoviesSeries } from "~/types/moviesSeries";

export const isMovie = (movie: MoviesSeries): movie is MoviesSeries => {
  return movie.type === "movie";
};
