import type { FC } from "react";
import styles from "~/styles/text.css";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
};

export const links = () => [{ rel: "stylesheet", href: styles }];

const Text: FC<Props> = ({ label, ...inputProps }) => {
  return (
    <div className="input-container">
      <label htmlFor={label} className="input-label">
        {label}
      </label>
      <input {...inputProps} className="input" />
    </div>
  );
};

export default Text;
