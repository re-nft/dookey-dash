import { default as NextHead } from "next/head";
import React, { useMemo } from "react";

import { APP_DESCRIPTION, APP_TITLE } from "@/config";

const LULZ = ["🚀", "🤟", "💖", "🫶"];
const getLulz = () => LULZ[Math.round(Math.random() * (LULZ.length - 1))];

export const Head = ({
  children,
  description = APP_DESCRIPTION,
  title: titlePrefix,
}: React.PropsWithChildren<{
  description?: string;
  title?: string | string[];
}>) => {
  const title = useMemo(
    () =>
      [titlePrefix, APP_TITLE]
        .filter(Boolean)
        .flat()
        // unsure if this is wise from SEO perspective...
        .map((s) => `${s} ${getLulz()}`)
        .join(" ")
        .trim(),
    [titlePrefix]
  );
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:image" content="https://ibb.co/NrWsLFs" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {children}
    </NextHead>
  );
};
