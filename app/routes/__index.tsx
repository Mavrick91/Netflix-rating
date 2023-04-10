import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Header, { links as headerLinks } from "~/components/Header";
import styles from "~/styles/indexLayout.css";

export const links: LinksFunction = () => [
  ...headerLinks(),
  { rel: "stylesheet", href: styles },
];

const __index = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default __index;
