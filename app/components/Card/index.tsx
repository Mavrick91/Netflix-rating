import styles from "~/styles/card.css";
import { convertRuntimeToHoursAndMinutes } from "~/utils/number";
import starIcon from "~/assets/icons/star.png";
import { decodeString } from "~/utils/string";
import type { MoviesSeries } from "~/types/moviesSeries";
import type { FC } from "react";

export const links = () => [{ rel: "stylesheet", href: styles }];

type Props = {
  items: MoviesSeries[];
};

const Card: FC<Props> = ({ items }) => {
  return (
    <div className="inner-movie">
      {items.map((item) => {
        return (
          <div className="movie-card" key={item.title}>
            <div className="movie-card__image">
              <img src={item.img} alt="Movie" />
            </div>
            <div className="movie-card__content">
              <div className="movie-card__title">
                {decodeString(item.title)}
              </div>
              <div className="movie-card__info">
                <div className="movie-card__info-year-runtime">
                  <div className="movie-card-year">{item.year}</div>
                  <div className="dot" />
                  <div className="movie-card-runtime">
                    {convertRuntimeToHoursAndMinutes(item.runtime)}
                  </div>
                </div>
                <div className="movie-card-rating">
                  <img src={starIcon} alt="Icon star" /> {item.rating || "?"}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
