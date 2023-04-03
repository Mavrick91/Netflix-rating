import { Link } from "@remix-run/react";
import starIcon from "~/assets/icons/star.png";
import styles from "~/styles/header.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

const Header = () => {
  return (
    <header className="header">
      <div className="mask" />
      <div className="header-content">
        <div className="logo">
          <img src={starIcon} alt="Icon star" />{" "}
          <Link to="/">Netflix Rating</Link>
        </div>
        <nav className="header-title">
          <ul>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/show-tv">Show TV</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
