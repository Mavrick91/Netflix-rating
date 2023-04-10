import starIcon from "~/assets/icons/star.png";
import styles from "~/styles/header.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

const Header = () => {
  return (
    <header className="header">
      <div className="mask" />
      <nav className="header-content">
        <div className="logo">
          <img src={starIcon} alt="Icon star" /> <span>Shows Rating</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
