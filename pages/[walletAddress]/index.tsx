import { Nft, OwnedNft } from "alchemy-sdk";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { toWords } from "number-to-words";
import * as React from "react";
import {
  isDelegateCashResult,
  useDelegateCash,
  useGetTokenLevelDelegations,
} from "use-delegatecash";
import { useAccount } from "wagmi";

import { compareAddresses } from "@/common/address.utils";
import { CONTRACT_ADDRESS_SEWER_PASS, URL_DOOKEY_DASH } from "@/config";
import { useDelegatedAddresses, useSewerPasses } from "@/react/api";
import { AlertInfo } from "@/react/components/alert/alert";
import { Button } from "@/react/components/button";
import {
  useAllowModal,
  useRevokeAllModal,
  useRevokeModal,
} from "@/react/modals";

const getMaybeDelegationForOwnedNft = ({
  ownedNft,
  tokenLevelDelegations: maybeTokenLevelDelegations,
}: {
  readonly ownedNft: OwnedNft;
  readonly tokenLevelDelegations: ReturnType<
    typeof useGetTokenLevelDelegations
  >;
}) => {
  if (!isDelegateCashResult(maybeTokenLevelDelegations)) return null;

  const tokenLevelDelegations = isDelegateCashResult(maybeTokenLevelDelegations)
    ? maybeTokenLevelDelegations.result
    : [];

  return tokenLevelDelegations
    .filter((e) => compareAddresses(e.contract, CONTRACT_ADDRESS_SEWER_PASS))
    .find((e) => e.tokenId === Number(ownedNft.tokenId));
};

const getTierForToken = (ownedNft: OwnedNft): number => {
  const attributes = ownedNft?.rawMetadata?.attributes;
  if (!Array.isArray(attributes)) return -1;

  const maybeTier = attributes.find(
    (attribute) => attribute?.trait_type === "Tier"
  );

  if (!maybeTier) return -1;

  return Number(maybeTier.value);
};

function WalletAddressPageForCurrentUser(): JSX.Element {
  const delegateCash = useDelegateCash();

  // Addresses they've delegated to.
  const { addresses, refetch } = useDelegatedAddresses();

  // Tokens they've been delegated?

  const { open: openRevokeModal } = useRevokeModal();
  const { open: openRevokeAllModal } = useRevokeAllModal();

  const { address: connectedAddress } = useAccount();

  const { data: maybeData } = useSewerPasses({
    address: connectedAddress,
  });

  const onClickRevokeAll = React.useCallback(async () => {
    try {
      await delegateCash.revokeAllDelegates();
      openRevokeAllModal({});
      await refetch();
    } catch (e) {
      console.error(e);
    }
  }, [delegateCash, openRevokeAllModal, refetch]);

  const onClickRevokeDelegate = React.useCallback(
    async (delegate: string) => {
      try {
        await delegateCash.revokeDelegate(delegate);
        openRevokeModal({ nameOfRevokedToken: "Sewer Pass" });
        await refetch();
      } catch (e) {
        console.error(e);
      }
    },
    [delegateCash, openRevokeModal, refetch]
  );

  const ownedSewerPasses: OwnedNft[] = maybeData?.ownedNfts || [];
  const sewerPassesDelegatedToMe: Nft[] = maybeData?.delegatedNfts || [];

  const doesOwnSewerPasses = Boolean(ownedSewerPasses.length);

  const hasBeenDelegatedSewerPasses = Boolean(sewerPassesDelegatedToMe.length);

  return (
    <>
      <AlertInfo
        text={
          doesOwnSewerPasses
            ? `You've delegated to ${toWords(addresses.length)} address${
                addresses.length === 1 ? "" : "es"
              }.`
            : "You don't own any Sewer Passes."
        }
      >
        <div className="flex grow-0 order-2 justify-center mt-5 md:mt-0">
          {addresses.length > 1 ? (
            <Button
              onClick={onClickRevokeAll}
              className="p-5 w-full m-3 bg-[#A855F7] shadow-md rounded text-white uppercase md:w-auto md:px-4 md:py-2"
            >
              Revoke All Delegates
            </Button>
          ) : (
            <>
              {addresses.map((address: string) => (
                <Button
                  key={address}
                  children={`Revoke ${address}`}
                  onClick={() => onClickRevokeDelegate(address)}
                  className="p-5 w-full m-3 bg-[#A855F7] shadow-md rounded text-white uppercase md:w-auto md:px-4 md:py-2"
                />
              ))}
            </>
          )}
        </div>
      </AlertInfo>
      <AlertInfo
        text={
          hasBeenDelegatedSewerPasses
            ? `You've been delegated ${toWords(
                sewerPassesDelegatedToMe.length
              )} Sewer Pass${addresses.length === 1 ? "" : "es"}.`
            : "You haven't been delegated any Sewer Passes."
        }
      >
        {hasBeenDelegatedSewerPasses && (
          <div className="flex grow-0 order-2 justify-center mt-5 md:mt-0"></div>
        )}
        <div className="flex grow-0 order-2 justify-center mt-5 md:mt-0">
          {Boolean(hasBeenDelegatedSewerPasses || doesOwnSewerPasses) && (
            <Button
              children="Play Dookey Dash"
              onClick={() => {
                window.open(URL_DOOKEY_DASH, "_blank");
              }}
            />
          )}
        </div>
      </AlertInfo>
    </>
  );
}

function WalletAddressPageForAnotherUser({
  walletAddress: addressToDelegateTo,
}: {
  readonly walletAddress: string;
}): JSX.Element {
  const delegateCash = useDelegateCash();

  const {
    refetch: refetchDelegatedAddresses,
    tokenLevelDelegations: maybeTokenLevelDelegations,
  } = useDelegatedAddresses();

  const { open: openAllowModal } = useAllowModal();
  const { address } = useAccount();

  const addressToDelegateFrom =
    process.env.NEXT_PUBLIC_EXAMPLE_WALLET_TO_DELEGATE_FROM || address;

  const { data: maybeData } = useSewerPasses({
    address: addressToDelegateFrom,
  });

  const onClickDelegate = React.useCallback(
    async (token: OwnedNft) => {
      try {
        await delegateCash.delegateForToken(
          addressToDelegateTo,
          CONTRACT_ADDRESS_SEWER_PASS,
          parseInt(token.tokenId, 10),
          true
        );

        requestAnimationFrame(() =>
          openAllowModal({ address: addressToDelegateTo })
        );

        return refetchDelegatedAddresses();
      } catch (cause) {
        console.error("Failed to delegate token.", { cause });
      }
    },
    [
      refetchDelegatedAddresses,
      delegateCash,
      addressToDelegateTo,
      openAllowModal,
    ]
  );

  const data: OwnedNft[] = maybeData?.ownedNfts;

  const didDelegateToUser = React.useMemo(
    () =>
      data.find((ownedNft: OwnedNft) => {
        const maybeDelegation = getMaybeDelegationForOwnedNft({
          ownedNft,
          tokenLevelDelegations: maybeTokenLevelDelegations,
        });

        if (!maybeDelegation) return false;

        return compareAddresses(maybeDelegation.delegate, addressToDelegateTo);
      }),
    [data, addressToDelegateTo, maybeTokenLevelDelegations]
  );

  const { open: openRevokeModal } = useRevokeModal();

  const onClickRevoke = React.useCallback(async () => {
    try {
      await delegateCash.revokeDelegate(addressToDelegateTo);
      openRevokeModal({ nameOfRevokedToken: "Sewer Pass" });
      await refetchDelegatedAddresses();
    } catch (e) {
      console.error(e);
    }
  }, [
    delegateCash,
    addressToDelegateTo,
    openRevokeModal,
    refetchDelegatedAddresses,
  ]);

  return (
    <AlertInfo>
      {Boolean(didDelegateToUser) && (
        <Button onClick={onClickRevoke}>Revoke Access</Button>
      )}
      {[1, 2, 3, 4]
        .map((tier: number) =>
          data.filter((ownedNft) => getTierForToken(ownedNft) === tier)
        )
        .flatMap((tokensForTier) => {
          const sortedTokens = tokensForTier.sort(
            (a, b) => Number(a.tokenId) - Number(b.tokenId)
          );
          return sortedTokens.map((ownedNft: OwnedNft) => {
            const { tokenId } = ownedNft;
            const tier = getTierForToken(ownedNft);

            const maybeDelegatedToken = getMaybeDelegationForOwnedNft({
              ownedNft,
              tokenLevelDelegations: maybeTokenLevelDelegations,
            });

            // If the user has delegated the token, offer them the chance to undelegate.
            const tokenIsDelegated = Boolean(maybeDelegatedToken);

            return (
              <Button
                key={tokenId}
                disabled={tokenIsDelegated}
                onClick={() => onClickDelegate(ownedNft)}
                className={`p-5 w-full m-3 bg-[${
                  // TODO: Can someone who understands tailwind fix this please. When delegated it should look disabled.
                  tokenIsDelegated ? "#A855F7" : "#A855F7"
                }] shadow-md rounded text-white uppercase md:w-auto md:px-4 md:py-2`}
              >
                Tier #{String(tier)} {tokenId}
              </Button>
            );
          });
        })}
    </AlertInfo>
  );
}

export default React.memo(function WalletAddressPage(): JSX.Element {
  const { address } = useAccount();
  const { walletAddress } = useRouter().query;

  if (
    typeof walletAddress !== "string" ||
    !ethers.utils.isAddress(walletAddress)
  )
    return <></>;

  if (compareAddresses(address, walletAddress))
    return <WalletAddressPageForCurrentUser />;

  return <WalletAddressPageForAnotherUser walletAddress={walletAddress} />;
});
