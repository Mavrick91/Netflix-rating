import type { Dispatch, FC, SetStateAction } from "react";
import { useMemo, useState } from "react";
import infoIcon from "~/assets/icons/info.png";
import arrowBack from "~/assets/icons/left-arrow.png";
import playIcon from "~/assets/icons/play-button.png";
import arrowNext from "~/assets/icons/right-arrow.png";
import starIcon from "~/assets/icons/star.png";
import styles from "~/styles/card.css";
import type { MoviesSeries } from "~/types/moviesSeries";
import { isMovie } from "~/utils/movie";
import {
  calculateAverage,
  convertRuntimeToHoursAndMinutes,
} from "~/utils/number";
import { removeHashAtBeginning } from "~/utils/string";
import Modal from "../Modal";
import VideoPlayer from "../VideoPlayer";

export const links = () => [{ rel: "stylesheet", href: styles }];

type Props = {
  items: MoviesSeries[];
  setPage: Dispatch<SetStateAction<number>>;
  hasNextPage: boolean;
  page: number;
};

const Card: FC<Props> = ({ items, setPage, hasNextPage, page }) => {
  const [trailerUrl, setTrailerUrl] = useState("");

  const buttonPrevious = useMemo(() => {
    if (page === 1) return null;

    return (
      <button
        type="button"
        onClick={() => setPage((prevPage) => prevPage - 1)}
        className="arrow arrow-back"
      >
        <img src={arrowBack} alt="Play" />
      </button>
    );
  }, [page, setPage]);

  const buttonNext = useMemo(() => {
    if (hasNextPage) {
      return (
        <button
          type="button"
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="arrow arrow-next"
        >
          <img src={arrowNext} alt="Play" />
        </button>
      );
    }
    return null;
  }, [hasNextPage, setPage]);

  return (
    <div className="container-shows">
      {buttonPrevious}
      {buttonNext}
      <div className="inner-shows">
        {items.map((item) => {
          let runtime = null;

          if (isMovie(item))
            runtime = convertRuntimeToHoursAndMinutes(item.runtime);
          else if (!isMovie(item) && item.episodeRuntimes.length >= 1)
            runtime = `~ ${convertRuntimeToHoursAndMinutes(
              calculateAverage(item.episodeRuntimes)
            )}`;

          return (
            <div className="movie-card" key={item.imdbId}>
              <div className="movie-card__image">
                <img src={item.posterURLs[185]} alt="Movie" />
                <div className="movie-card__image--hover">
                  <div className="movie-card__image--hover-content">
                    <div className="movie-card__image--hover-content-option">
                      <img src={infoIcon} alt="Info" />
                    </div>
                    {item.youtubeTrailerVideoLink && (
                      <button
                        onClick={() =>
                          setTrailerUrl(item.youtubeTrailerVideoLink)
                        }
                      >
                        <div className="movie-card__image--hover-content-option">
                          <img src={playIcon} alt="trailer" />
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="movie-card__content">
                <div className="movie-card__title">
                  {removeHashAtBeginning(item.title)}
                </div>
                <div className="movie-card__info">
                  <div className="movie-card__info-year-runtime">
                    <div className="movie-card-year">
                      {item.year || item.firstAirYear}
                    </div>
                    {runtime && (
                      <>
                        <div className="dot" />
                        <div className="movie-card-runtime">{runtime}</div>
                      </>
                    )}
                  </div>
                  <div className="movie-card-rating">
                    <img src={starIcon} alt="Icon star" />{" "}
                    {item.imdbRating / 10 || "?"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {trailerUrl && (
          <Modal handleClose={() => setTrailerUrl("")}>
            <VideoPlayer url={trailerUrl} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Card;
