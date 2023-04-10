import { useEffect, useState } from "react";
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
  const [value, setValue] = useState(inputProps.value || "");

  useEffect(() => {
    setValue(inputProps.defaultValue || "");
  }, [inputProps.defaultValue]);

  return (
    <div className="input-container">
      <label htmlFor={label} className="input-label">
        {label}
      </label>
      <input
        {...inputProps}
        className="input"
        name={value ? inputProps.name : undefined}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Text;
