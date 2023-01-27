import * as React from "react";
import { DelegateCashResult } from "use-delegatecash";

import { compareAddresses } from "@/common/address.utils";
import { DelegationsToken } from "@/react/delegator";

export const Delegations = React.memo(function Delegations({
  filterByContractAddress = undefined,
  tokenLevelDelegations: { result: defaultTokenLevelDelegations },
  contractLevelDelegations: { result: defaultContractLevelDelegations },
  allDelegations: { result: allDelegations },
  onRequestRevokeAll,
  onRequestRevokeDelegate,
}: {
  readonly filterByContractAddress?: string;
  readonly tokenLevelDelegations: DelegateCashResult<"getTokenLevelDelegations">;
  readonly contractLevelDelegations: DelegateCashResult<"getContractLevelDelegations">;
  readonly allDelegations: DelegateCashResult<"getDelegatesForAll">;
  readonly vault: string;
  readonly onRequestRevokeDelegate: (delegate: string) => void;
  readonly onRequestRevokeAll: () => void;
}): JSX.Element {
  const tokenLevelDelegations = defaultTokenLevelDelegations.filter((e) =>
    filterByContractAddress
      ? compareAddresses(e.contract, filterByContractAddress)
      : true
  );

  const contractLevelDelegations = defaultContractLevelDelegations.filter((e) =>
    filterByContractAddress
      ? compareAddresses(e.contract, filterByContractAddress)
      : true
  );

  const allAddressesDelegatedTo = [
    ...new Set([
      ...tokenLevelDelegations.map(({ delegate }) => delegate),
      ...contractLevelDelegations.map(({ delegate }) => delegate),
      ...allDelegations.map((delegate) => delegate),
    ]),
  ];

  return (
    <>
      <span>Remove all delegates:</span>
      <button onClick={onRequestRevokeAll}>click to remove all</button>

      <span>Remove individual delegates:</span>

      {allAddressesDelegatedTo.map((address: string) => (
        <button key={address} onClick={() => onRequestRevokeDelegate(address)}>
          click to remove {address}
        </button>
      ))}

      <span>Delegation Breakdown:</span>
      {tokenLevelDelegations
        .filter((e) =>
          filterByContractAddress
            ? compareAddresses(e.contract, filterByContractAddress)
            : true
        )
        .map((e) => (
          <DelegationsToken
            key={`${e.delegate}${e.contract}${e.tokenId}`}
            {...e}
          />
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
