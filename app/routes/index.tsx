import { Header, links as headerLinks } from "~/components/Header";

import styles from "~/styles/index.css";
export default function Index() {

export const links = () => [
  ...headerLinks(),
  { rel: "stylesheet", href: styles },
];

const Index = () => {
  return (
    <div className="container">
      <Header />
      <main>
        <section className="inner-container">
          <h1 className="heading">
            The Ultimate Movie Rating Database and Review Site
          </h1>
        </section>
      </main>
    </div>
  );
};

export default Index;
