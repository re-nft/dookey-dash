import { OwnedNft } from "alchemy-sdk";
import * as React from "react";

import { Image } from "@/react/components/Image";

export const ModalDelegateToContentSewerPass = React.memo(
  function ModalDelegateToContentSewerPass({
    onClickDelegate,
    width,
    height,
    ...nft
  }: OwnedNft & {
    readonly onClickDelegate: () => void;
    readonly width: number;
    readonly height: number;
  }): JSX.Element {
    return (
      <Image
        onClick={onClickDelegate}
        alt={`Sewer Pass #${nft?.tokenId}`}
        src={nft.media?.[0]?.thumbnail || ""}
        fallbackSrc={nft.media?.[0]?.thumbnail || ""}
        width={width}
        height={height}
      />
    );
  }
);
