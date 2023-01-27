import * as React from "react";
import { TwitterShareButton } from "react-twitter-embed";

export function TwitterShare({
  urlToShare,
  textToShare,
}: {
  readonly urlToShare: string;
  readonly textToShare: string;
}): JSX.Element {
  return (
    <TwitterShareButton
      url={urlToShare}
      options={React.useMemo(
        () => ({
          size: "large",
          text: textToShare,
        }),
        []
      )}
    />
  );
}
