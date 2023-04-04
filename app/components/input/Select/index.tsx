import type { FC } from "react";
import styles from "~/styles/select.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

type Props = {
  label: string;
  items: Record<string, string>[];
};
const Select: FC<Props> = ({ items, label }) => {
  return (
    <div className="select-container">
      <label htmlFor={label} className="select-label">
        {label}
      </label>
      <div className="select-border">
        <select name={label} id={label} className="select-dropdown">
          {items.map((item) => {
            return (
              <option
                key={item.value}
                value={item.value}
                className="select-option"
              >
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Select;
