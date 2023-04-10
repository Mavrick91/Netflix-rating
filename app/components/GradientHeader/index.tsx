import type { FC } from "react";
import React from "react";
import styles from "~/styles/gradientHeader.css";

type Props = {
  children: React.ReactNode;
};

export const links = () => [{ rel: "stylesheet", href: styles }];

const GradientHeader: FC<Props> = ({ children }) => {
  return <h1 className="heading">{children}</h1>;
};

export default GradientHeader;
