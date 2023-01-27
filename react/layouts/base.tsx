import React from "react";

import styles from "@/styles/Home.module.scss";

import { Nav } from "./components/nav";
import { Head } from "./head";

export const BaseLayout = ({
  children,
}: React.PropsWithChildren<{
  readonly documentTitle?: string;
}>) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        id="layout"
        data-testid="<BaseLayout />"
        className="p-6 flex flex-col justify-between h-screen"
      >
        <Nav />
        <main className="p-4 lg:p-8">
          <div role="presentation">{children}</div>
        </main>
        <footer className={styles.footer}>
          <a
            href="https://rainbow.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made with ❤️ by your frens at 🌈
          </a>
        </footer>
      </div>
    </>
  );
};
