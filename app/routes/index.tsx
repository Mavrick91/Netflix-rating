import { Header, links as headerLinks } from "~/components/Header";

import styles from "~/styles/index.css";
export default function Index() {

export const links = () => [
  ...headerLinks(),
  { rel: "stylesheet", href: styles },
];

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <section className="inner-container">
          <div className="centered-heading-container">
            <h1 className="heading">
              The Ultimate Movie Rating Database and Review Site
            </h1>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
