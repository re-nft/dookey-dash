import Head from "next/head";
import React from "react";

import styles from "@/styles/Home.module.scss";

import { Nav } from "./components/nav";

const BASE_TITLE = "reNFT - Rent & Lend NFTs";

export const BaseLayout = ({
  children,
  documentTitle,
}: React.PropsWithChildren<{
  readonly documentTitle?: string;
}>) => {
  const title = `${documentTitle ? `${documentTitle} - ` : ""}${BASE_TITLE}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
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
