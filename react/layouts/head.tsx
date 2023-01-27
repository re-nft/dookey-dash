import { default as NextHead } from "next/head";
import React, { useMemo } from "react";

import { APP_DESCRIPTION, APP_TITLE } from "@/config";

const LULZ = ["🚀", "🤟", "💖", "🫶"];
const getLulz = () => LULZ[Math.round(Math.random() * LULZ.length)];

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
      {children}
    </NextHead>
  );
};
