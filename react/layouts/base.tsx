import React from "react";

import { Nav } from "@/react/layouts/components/nav";
import { Footer } from "@/react/layouts/Footer";
import { Head } from "@/react/layouts/head";

const container = "p-4 lg:p-8";

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
        className="flex flex-col w-screen h-screen"
      >
        <Nav className={container} />

        <main className={container}>{children}</main>

        <Footer />
      </div>
    </>
  );
};
