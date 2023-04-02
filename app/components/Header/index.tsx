import StarSVG from "../svg/StarSVG";

import styles from "~/styles/header.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

export const Header = () => {
  return (
    <header className="header">
      <div className="mask" />
      <div className="header-content">
        <nav className="header-title">
          <StarSVG /> <span>Netflix Rating</span>
        </nav>
      </div>
    </header>
  );
};
