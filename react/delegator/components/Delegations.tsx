import * as React from "react";
import { DelegateCashResult } from "use-delegatecash";

import { compareAddresses } from "@/common/address.utils";

export const Delegations = React.memo(function Delegations({
  filterByContractAddress = undefined,
  tokenLevelDelegations: { result: tokenLevelDelegations },
  contractLevelDelegations: { result: contractLevelDelegations },
  allDelegations: { result: allDelegations },
}: {
  readonly filterByContractAddress?: string;
  readonly tokenLevelDelegations: DelegateCashResult<"getTokenLevelDelegations">;
  readonly contractLevelDelegations: DelegateCashResult<"getContractLevelDelegations">;
  readonly allDelegations: DelegateCashResult<"getDelegatesForAll">;
  readonly vault: string;
}): JSX.Element {
  return (
    <>
      {tokenLevelDelegations
        .filter((e) =>
          filterByContractAddress
            ? compareAddresses(e.contract, filterByContractAddress)
            : true
        )
        .map((e) => (
          <span key={`${e.delegate}${e.contract}${e.tokenId}`}>
            Token level delegation: {e.delegate} {e.tokenId} {e.contract}
          </span>
        ))}
      {contractLevelDelegations
        .filter((e) =>
          filterByContractAddress
            ? compareAddresses(e.contract, filterByContractAddress)
            : true
        )
        .map((e) => (
          <span key={`${e.delegate}${e.contract}`}>
            Contract level delegation: {e.delegate} {e.contract}
          </span>
        ))}
      {allDelegations.map((e) => (
        <span key={e}>All level delegation: {e}</span>
      ))}
    </>
  );
});
