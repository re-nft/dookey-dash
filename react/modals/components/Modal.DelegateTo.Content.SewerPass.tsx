import {OwnedNft} from "alchemy-sdk";
import * as React from "react";

export const ModalDelegateToContentSewerPass = React.memo(
  function ModalDelegateToContentSewerPass({
    onClickDelegate,
    ...nft
  }: OwnedNft & {
    readonly onClickDelegate: () => void;
  }): JSX.Element {
    return (
      <img
        onClick={onClickDelegate}
        style={{aspectRatio: 1, width: 200}}
        alt={`Sewer Pass #${nft?.tokenId}`}
        src={nft.media?.[0]?.thumbnail}
      />
    );
  }
);
