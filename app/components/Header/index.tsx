import starIcon from "~/assets/icons/star.png";
import styles from "~/styles/header.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

export const Header = () => {
  return (
    <header className="header">
      <div className="mask" />
      <div className="header-content">
        <div className="logo">
          <img src={starIcon} alt="Icon star" /> <span>Netflix Rating</span>
        </div>
        <nav className="header-title">
          <ul>
            <li>Movies</li>
            <li>Shows TV</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
