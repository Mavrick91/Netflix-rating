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
          <span>Movies and Series Rating</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
