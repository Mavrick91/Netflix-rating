import type { FC } from "react";
import { useState } from "react";
import starIcon from "~/assets/icons/star.png";
import styles from "~/styles/card.css";
import type { MoviesSeries } from "~/types/moviesSeries";
import { isMovie } from "~/utils/movie";
import {
  calculateAverage,
  convertRuntimeToHoursAndMinutes,
} from "~/utils/number";
import { removeHashAtBeginning } from "~/utils/string";
import infoIcon from "~/assets/icons/info.png";
import playIcon from "~/assets/icons/play-button.png";
import VideoPlayer from "../VideoPlayer";
import Modal from "../Modal";
import arrowBack from "~/assets/icons/left-arrow.png";
import arrowNext from "~/assets/icons/right-arrow.png";

export const links = () => [{ rel: "stylesheet", href: styles }];

type Props = {
  items: MoviesSeries[];
};

const Card: FC<Props> = ({ items }) => {
  const [trailerUrl, setTrailerUrl] = useState("");

  return (
    <div className="container-shows">
      <div className="arrow arrow-back">
        <img src={arrowBack} alt="Play" />
      </div>
      <div className="arrow arrow-next">
        <img src={arrowNext} alt="Play" />
      </div>
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
            <div className="movie-card" key={item.title}>
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
