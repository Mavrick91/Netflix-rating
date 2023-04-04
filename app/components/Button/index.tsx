import type { FC } from "react";
import styles from "~/styles/button.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: FC<Props> = ({ children, ...buttonProps }) => {
  return (
    <button {...buttonProps} className="button-container">
      {children}
    </button>
  );
};

export default Button;
