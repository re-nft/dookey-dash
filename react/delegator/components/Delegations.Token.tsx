import { useNFT } from "@zoralabs/nft-hooks";
import * as React from "react";
import { DelegateCashResult } from "use-delegatecash";

export const DelegationsToken = React.memo(function DelegationsToken({
  tokenId,
  contract,
}: DelegateCashResult<"getTokenLevelDelegations">["result"][number]): JSX.Element {
  const x = useNFT(contract, `${tokenId}`);

  if (!x.data) return <span>loading...</span>;

  const y = x.data.media?.image;

  return <img src={y?.uri} style={{ width: 250, height: 250 }} />;
});
