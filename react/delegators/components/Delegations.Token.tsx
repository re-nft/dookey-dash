import { useNFT } from "@zoralabs/nft-hooks";
import * as React from "react";
import { DelegateCashResult } from "use-delegatecash";

import { Image } from "@/react/components/Image";

export const DelegationsToken = React.memo(function DelegationsToken({
  tokenId,
  contract,
}: DelegateCashResult<"getTokenLevelDelegations">["result"][number]): JSX.Element {
  const x = useNFT(contract, `${tokenId}`);

  if (!x.data) return <span>loading...</span>;

  const y = x.data.media?.image;

  return (
    <Image
      src={y?.uri || ""}
      fallbackSrc={y?.uri || ""}
      width="250"
      height="250"
      alt=""
    />
  );
});
