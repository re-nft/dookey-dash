import {OwnedNft} from "alchemy-sdk";
import * as React from 'react';
import {useModalProps} from "react-simple-modal-provider";
import {useDelegateCash} from "use-delegatecash";
import {useAccount} from "wagmi";

import {CONTRACT_ADDRESS_SEWER_PASS} from "@/config";
import {useDelegatedAddresses, useSewerPasses} from "@/react/api";
import {useAllowModal} from "@/react/modals";
import {useRouter} from "next/router";

const getTierForToken = (ownedNft: OwnedNft): number => {
    const attributes = ownedNft?.rawMetadata?.attributes;
    if (!Array.isArray(attributes)) return -1;

    const maybeTier = attributes.find(
        (attribute) => attribute?.trait_type === "Tier"
    );

    if (!maybeTier) return -1;

    return Number(maybeTier.value);
};

export default React.memo(
  function WalletAddressPage(): JSX.Element {
      const delegateCash = useDelegateCash();

      // HACK: Since we use react-query, we can ask for delegatedAddresses
      //       to be refreshed here and incur an update for the rest of the
      //       application.
      const { refetch: refetchDelegatedAddresses } = useDelegatedAddresses();

      const onAfterDelegateToken = React.useCallback(
          () => refetchDelegatedAddresses(),
          [refetchDelegatedAddresses]
      );

      const {walletAddress} = useRouter().query;
      const addressToDelegateTo = String(walletAddress);

      const { open: openAllowModal } = useAllowModal();
      const { address } = useAccount();

      const addressToDelegateFrom = process.env.NEXT_PUBLIC_EXAMPLE_WALLET_TO_DELEGATE_FROM || address;

      const { data: maybeData } = useSewerPasses({
          address: addressToDelegateFrom,
      });

      const onClickDelegate = React.useCallback(
          async (token: OwnedNft) => {
              try {
                  requestAnimationFrame(() =>
                      openAllowModal({ address: addressToDelegateTo })
                  );

                  await delegateCash.delegateForToken(
                      addressToDelegateTo,
                      CONTRACT_ADDRESS_SEWER_PASS,
                      parseInt(token.tokenId, 10),
                      true
                  );

                  return onAfterDelegateToken();
              } catch (cause) {
                  console.error("Failed to delegate token.", { cause });
              }
          },
          [
              onAfterDelegateToken,
              delegateCash,
              addressToDelegateTo,
              openAllowModal,
          ]
      );

      const data: OwnedNft[] = maybeData || [];

      return (
          <div style={{overflow: 'scroll'}}>
              {[1, 2, 3, 4]
                  .map((tier: number) => data.filter(ownedNft => getTierForToken(ownedNft) === tier))
                  .flatMap(
                      (tokensForTier) => {

                          const sortedTokens = tokensForTier.sort((a, b) => Number(a.tokenId) - Number(b.tokenId));

                          return sortedTokens.map(
                              (token) => {
                                  const tier = getTierForToken(token);
                                  return (
                                      <button
                                          key={String(`${tier}${token.tokenId}`)}
                                          onClick={() => onClickDelegate(token)}
                                          className="p-5 w-full m-3 bg-[#A855F7] shadow-md rounded text-white uppercase md:w-auto md:px-4 md:py-2"
                                      >
                                          Tier #{String(tier)} {token.tokenId}
                                      </button>
                                  );
                              },
                          );
                      })}
          </div>
      );
  }
);
