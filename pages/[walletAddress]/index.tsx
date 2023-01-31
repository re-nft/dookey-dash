import { Nft, OwnedNft } from "alchemy-sdk";
import { useRouter } from "next/router";
import * as React from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import { useDelegateCash } from "use-delegatecash";
import { useAccount } from "wagmi";

import { compareAddresses } from "@/common/address.utils";
import { CONTRACT_ADDRESS_SEWER_PASS } from "@/config";
import { useSewerPasses } from "@/react/api";
import {GooLoader} from "@/react/components/GooLoader";
import { Image } from "@/react/components/Image";
import { useAllowModal } from "@/react/modals";

const carouselButtonStyle: React.CSSProperties = {
  alignSelf: "center",
  background: "#A252EF",
  margin: 5,
  border: "none",
  borderRadius: "50%",
  color: "white",
  cursor: "pointer",
  fontSize: "20px",
  height: 30,
  lineHeight: 1,
  textAlign: "center",
  width: 30,
};

const getTierForToken = (ownedNft: Nft): number => {
  const attributes = ownedNft?.rawMetadata?.attributes;
  if (!Array.isArray(attributes)) return -1;

  const maybeTier = attributes.find(
    (attribute) => attribute?.trait_type === "Tier"
  );

  if (!maybeTier) return -1;

  return Number(maybeTier.value);
};

function ListOfSewerPasses<T extends Nft>({
  cardWidth = 300,
  cardHeight = 360,
  sewerPasses,
  padding = 15,
  onClickSewerPass,
}: {
  readonly cardWidth?: number;
  readonly cardHeight?: number;
  readonly sewerPasses: readonly T[];
  readonly padding?: number;
  readonly onClickSewerPass?: (sewerPass: T) => void;
}) {
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0);

  const renderSewerPass = React.useCallback(
    (sewerPass: T): JSX.Element => (
      <div
        onClick={
          onClickSewerPass ? () => onClickSewerPass(sewerPass) : undefined
        }
        style={{
          width: cardWidth,
          height: cardHeight,
          padding,
        }}
      >
        <div style={{ borderRadius: 15, overflow: "hidden" }}>
          <Image
            height={cardWidth - 2 * padding}
            width={cardWidth - 2 * padding}
            // @ts-expect-error undefined
            fallbackSrc={sewerPass.media[0]?.thumbnail}
            src={sewerPass.media[0]?.raw}
            alt={sewerPass.title}
            key={sewerPass.tokenId}
          />
          <div
            style={{
              width: cardWidth - 2 * padding,
              height: cardHeight - cardWidth,
              flex: 1,
              backgroundColor: "#A252EF",
              padding: 15,
            }}
          >
            <p className="text-xl max-w text-white">
              Token #{sewerPass.tokenId} (Tier {getTierForToken(sewerPass)})
            </p>
          </div>
        </div>
      </div>
    ),
    []
  );

  return (
    <ReactSimplyCarousel
      activeSlideIndex={activeSlideIndex}
      onRequestChange={setActiveSlideIndex}
      itemsToShow={2}
      itemsToScroll={2}
      forwardBtnProps={{
        style: carouselButtonStyle,
        children: <span>{">"}</span>,
      }}
      backwardBtnProps={{
        style: carouselButtonStyle,
        children: <span>{"<"}</span>,
      }}
      responsiveProps={[
        {
          itemsToShow: 2,
          itemsToScroll: 2,
          minWidth: 768,
        },
      ]}
    >
      {sewerPasses.map(renderSewerPass)}
    </ReactSimplyCarousel>
  );
}

export default function WalletAddressPage(): JSX.Element {
  const { address } = useAccount();
  const { walletAddress } = useRouter().query;
  const delegateCash = useDelegateCash();

  const addressWeAreLookingAt = String(walletAddress);
  const isLookingAtAnotherUserProfile = !compareAddresses(
    address,
    addressWeAreLookingAt
  );

  const {
    isLoading: isLoadingAddressWeAreLookingAt,
    data: addressWeAreLookingAtData,
  } = useSewerPasses({
    address: addressWeAreLookingAt,
  });

  const {
    isLoading: isLoadingCurrentUserAddressData,
    data: currentUserAddressData,
  } = useSewerPasses({
    address,
  });

  const addressWeAreLookingAtSewerPasses: OwnedNft[] =
    addressWeAreLookingAtData?.ownedNfts || [];
  const addressWeAreLookingAtDelegatedSewerPasses: Nft[] =
    addressWeAreLookingAtData?.delegatedNfts || [];
  const addressWeAreLookingAtDelegatedToOthersSewerPasses: Nft[] =
    addressWeAreLookingAtData?.delegatedToOthersNfts || [];

  const shortAddress = addressWeAreLookingAt.substring(0, 6);
  const pronoun = isLookingAtAnotherUserProfile ? shortAddress : "You";

  const addressWeAreLookingAtHasNothing =
    !isLoadingAddressWeAreLookingAt &&
    addressWeAreLookingAtSewerPasses.length === 0 &&
    addressWeAreLookingAtDelegatedSewerPasses.length === 0 &&
    addressWeAreLookingAtDelegatedToOthersSewerPasses.length === 0;

  const currentUserAddressOwnedSewerPasses: OwnedNft[] =
    currentUserAddressData?.ownedNfts || [];

  const shouldPresentOptionToDelegate =
    currentUserAddressOwnedSewerPasses.length > 0 &&
    isLookingAtAnotherUserProfile;

  const { open: openAllowModal } = useAllowModal();

  const onClickDelegateSewerPassToUser = React.useCallback(
    async (nft: OwnedNft) => {
      try {
        const { tokenId } = nft;

        await delegateCash.delegateForToken(
          addressWeAreLookingAt,
          CONTRACT_ADDRESS_SEWER_PASS,
          parseInt(tokenId, 10),
          true
        );

        openAllowModal({ address: addressWeAreLookingAt });
      } catch (e) {
        console.error(e);
      }
    },
    [delegateCash, addressWeAreLookingAt, openAllowModal]
  );

  const isAllLoading = isLoadingCurrentUserAddressData || isLoadingAddressWeAreLookingAt;

  if (isAllLoading) return <GooLoader />;

  return (
    <>
      <div className="font-semibold order-2">
        <p className="text-2xl max-w text-white">
          {isLookingAtAnotherUserProfile ? (
            <span>
              <span>{shortAddress}</span>&apos;s Sewer Passes
            </span>
          ) : (
            "My Sewer Passes"
          )}
        </p>
        {addressWeAreLookingAtHasNothing && (
          <p className="text-xl max-w text-white">
            {isLookingAtAnotherUserProfile ? (
              <span children={`${shortAddress} has no Sewer Passes. :(`} />
            ) : (
              <span children="It looks like you don't have any Sewer Passes yet..." />
            )}
          </p>
        )}
        {shouldPresentOptionToDelegate && (
          <div>
            <p className="text-xl max-w text-white">
              You can delegate! Tap on one of your Sewer Passes to allow{" "}
              {pronoun} to play!
            </p>
            <ListOfSewerPasses
              onClickSewerPass={onClickDelegateSewerPassToUser}
              sewerPasses={currentUserAddressOwnedSewerPasses}
            />
          </div>
        )}
        {Boolean(addressWeAreLookingAtDelegatedSewerPasses.length) && (
          <div>
            <p className="text-xl max-w text-white">
              Passes Delegated to {pronoun}
            </p>
            <ListOfSewerPasses
              // Nothing to click on tokens which have been delegated to an address.
              //onClickSewerPass={onClickAddressWeAreLookingAtDelegatedSewerPasses}
              sewerPasses={addressWeAreLookingAtDelegatedSewerPasses}
            />
          </div>
        )}
        {Boolean(addressWeAreLookingAtSewerPasses.length) && (
          <div>
            <p className="text-xl max-w text-white">
              Passes Owned by {pronoun}
            </p>
            <ListOfSewerPasses sewerPasses={addressWeAreLookingAtSewerPasses} />
          </div>
        )}
        {Boolean(addressWeAreLookingAtDelegatedToOthersSewerPasses.length) && (
          <div>
            <p className="text-xl max-w text-white">
              Passes Delegated to Others by {pronoun}
            </p>
            <ListOfSewerPasses
              sewerPasses={addressWeAreLookingAtDelegatedToOthersSewerPasses}
            />
          </div>
        )}
      </div>
    </>
  );
}

//import { Nft, OwnedNft } from "alchemy-sdk";
//import { ethers } from "ethers";
//import { useRouter } from "next/router";
//import { toWords } from "number-to-words";
//import * as React from "react";
//import {
//  isDelegateCashResult,
//  useDelegateCash,
//  useGetTokenLevelDelegations,
//} from "use-delegatecash";
//import { useAccount } from "wagmi";
//
//import { compareAddresses } from "@/common/address.utils";
//import { CONTRACT_ADDRESS_SEWER_PASS, URL_DOOKEY_DASH } from "@/config";
//import { useDelegatedAddresses, useSewerPasses } from "@/react/api";
//import {
//  useAllowModal,
//  useRevokeAllModal,
//  useRevokeModal,
//} from "@/react/modals";
//
//const getMaybeDelegationForOwnedNft = ({
//  ownedNft,
//  tokenLevelDelegations: maybeTokenLevelDelegations,
//}: {
//  readonly ownedNft: OwnedNft;
//  readonly tokenLevelDelegations: ReturnType<
//    typeof useGetTokenLevelDelegations
//  >;
//}) => {
//  if (!isDelegateCashResult(maybeTokenLevelDelegations)) return null;
//
//  const tokenLevelDelegations = isDelegateCashResult(maybeTokenLevelDelegations)
//    ? maybeTokenLevelDelegations.result
//    : [];
//
//  return tokenLevelDelegations
//    .filter((e) => compareAddresses(e.contract, CONTRACT_ADDRESS_SEWER_PASS))
//    .find((e) => e.tokenId === Number(ownedNft.tokenId));
//};
//

//
//function WalletAddressPageForCurrentUser(): JSX.Element {
//  const delegateCash = useDelegateCash();
//
//  // Addresses they've delegated to.
//  const { addresses, refetch } = useDelegatedAddresses();
//
//  // Tokens they've been delegated?
//
//  const { open: openRevokeModal } = useRevokeModal();
//  const { open: openRevokeAllModal } = useRevokeAllModal();
//
//  const { address: connectedAddress } = useAccount();
//
//  const { data: maybeData } = useSewerPasses({
//    address: connectedAddress,
//  });
//
//  const onClickRevokeAll = React.useCallback(async () => {
//    try {
//      await delegateCash.revokeAllDelegates();
//      openRevokeAllModal({});
//      await refetch();
//    } catch (e) {
//      console.error(e);
//    }
//  }, [delegateCash, openRevokeAllModal, refetch]);
//
//  const onClickRevokeDelegate = React.useCallback(
//    async (delegate: string) => {
//      try {
//        await delegateCash.revokeDelegate(delegate);
//        openRevokeModal({ nameOfRevokedToken: "Sewer Pass" });
//        await refetch();
//      } catch (e) {
//        console.error(e);
//      }
//    },
//    [delegateCash, openRevokeModal, refetch]
//  );
//
//  const ownedSewerPasses: OwnedNft[] = maybeData?.ownedNfts || [];
//  const sewerPassesDelegatedToMe: Nft[] = maybeData?.delegatedNfts || [];
//
//  const doesOwnSewerPasses = Boolean(ownedSewerPasses.length);
//
//  const hasBeenDelegatedSewerPasses = Boolean(sewerPassesDelegatedToMe.length);
//
//  return (
//    <div>
//      <div>
//        {doesOwnSewerPasses ? (
//          <span
//            children={`You've delegated to ${toWords(
//              addresses.length
//            )} address${addresses.length === 1 ? "" : "es"}.`}
//          />
//        ) : (
//          <span children="You don't own any Sewer Passes." />
//        )}
//      </div>
//      <div>
//        {addresses.length > 1 ? (
//          <button
//            onClick={onClickRevokeAll}
//            className="p-5 w-full m-3 bg-[#A855F7] shadow-md rounded text-white uppercase md:w-auto md:px-4 md:py-2"
//          >
//            Revoke All Delegates
//          </button>
//        ) : (
//          <>
//            {addresses.map((address: string) => (
//              <button
//                key={address}
//                children={`Revoke ${address}`}
//                onClick={() => onClickRevokeDelegate(address)}
//                className="p-5 w-full m-3 bg-[#A855F7] shadow-md rounded text-white uppercase md:w-auto md:px-4 md:py-2"
//              />
//            ))}
//          </>
//        )}
//      </div>
//      <div>
//        {hasBeenDelegatedSewerPasses ? (
//          <span
//            children={`You've been delegated ${toWords(
//              sewerPassesDelegatedToMe.length
//            )} Sewer Pass${addresses.length === 1 ? "" : "es"}.`}
//          />
//        ) : (
//          <span children="You haven't been delegated any Sewer Passes." />
//        )}
//      </div>
//      {hasBeenDelegatedSewerPasses && <div></div>}
//      <div>
//        {Boolean(hasBeenDelegatedSewerPasses || doesOwnSewerPasses) && (
//          <a target="_blank" href={URL_DOOKEY_DASH} rel="noopener noreferrer">
//            <button
//              children="Play Dookey Dash"
//              className="p-5 w-full m-3 bg-[#A855F7] shadow-md rounded text-white uppercase md:w-auto md:px-4 md:py-2"
//            />
//          </a>
//        )}
//      </div>
//    </div>
//  );
//}
//
//function WalletAddressPageForAnotherUser({
//  walletAddress: addressToDelegateTo,
//}: {
//  readonly walletAddress: string;
//}): JSX.Element {
//  const delegateCash = useDelegateCash();
//
//  const {
//    refetch: refetchDelegatedAddresses,
//    tokenLevelDelegations: maybeTokenLevelDelegations,
//  } = useDelegatedAddresses();
//
//  const { open: openAllowModal } = useAllowModal();
//  const { address } = useAccount();
//
//  const addressToDelegateFrom =
//    process.env.NEXT_PUBLIC_EXAMPLE_WALLET_TO_DELEGATE_FROM || address;
//
//  const { data: maybeData } = useSewerPasses({
//    address: addressToDelegateFrom,
//  });
//
//  const onClickDelegate = React.useCallback(
//    async (token: OwnedNft) => {
//      try {
//        await delegateCash.delegateForToken(
//          addressToDelegateTo,
//          CONTRACT_ADDRESS_SEWER_PASS,
//          parseInt(token.tokenId, 10),
//          true
//        );
//
//        requestAnimationFrame(() =>
//          openAllowModal({ address: addressToDelegateTo })
//        );
//
//        return refetchDelegatedAddresses();
//      } catch (cause) {
//        console.error("Failed to delegate token.", { cause });
//      }
//    },
//    [
//      refetchDelegatedAddresses,
//      delegateCash,
//      addressToDelegateTo,
//      openAllowModal,
//    ]
//  );
//
//  const data: OwnedNft[] = maybeData?.ownedNfts || [];
//
//  const didDelegateToUser = React.useMemo(
//    () =>
//      data.find((ownedNft: OwnedNft) => {
//        const maybeDelegation = getMaybeDelegationForOwnedNft({
//          ownedNft,
//          tokenLevelDelegations: maybeTokenLevelDelegations,
//        });
//
//        if (!maybeDelegation) return false;
//
//        return compareAddresses(maybeDelegation.delegate, addressToDelegateTo);
//      }),
//    [data, addressToDelegateTo, maybeTokenLevelDelegations]
//  );
//
//  const { open: openRevokeModal } = useRevokeModal();
//
//  const onClickRevoke = React.useCallback(async () => {
//    try {
//      await delegateCash.revokeDelegate(addressToDelegateTo);
//      openRevokeModal({ nameOfRevokedToken: "Sewer Pass" });
//      await refetchDelegatedAddresses();
//    } catch (e) {
//      console.error(e);
//    }
//  }, [
//    delegateCash,
//    addressToDelegateTo,
//    openRevokeModal,
//    refetchDelegatedAddresses,
//  ]);
//
//  return (
//    <div style={{ overflow: "scroll" }}>
//      {Boolean(didDelegateToUser) && (
//        <div>
//          <button
//            onClick={onClickRevoke}
//            className={
//              "p-5 w-full m-3 bg-[#A855F7] shadow-md rounded text-white uppercase md:w-auto md:px-4 md:py-2"
//            }
//          >
//            Revoke Access
//          </button>
//        </div>
//      )}
//      {[1, 2, 3, 4]
//        .map((tier: number) =>
//          data.filter((ownedNft) => getTierForToken(ownedNft) === tier)
//        )
//        .flatMap((tokensForTier) => {
//          const sortedTokens = tokensForTier.sort(
//            (a, b) => Number(a.tokenId) - Number(b.tokenId)
//          );
//          return sortedTokens.map((ownedNft: OwnedNft) => {
//            const { tokenId } = ownedNft;
//            const tier = getTierForToken(ownedNft);
//
//            const maybeDelegatedToken = getMaybeDelegationForOwnedNft({
//              ownedNft,
//              tokenLevelDelegations: maybeTokenLevelDelegations,
//            });
//
//            // If the user has delegated the token, offer them the chance to undelegate.
//            const tokenIsDelegated = Boolean(maybeDelegatedToken);
//
//            return (
//              <button
//                key={tokenId}
//                disabled={tokenIsDelegated}
//                onClick={() => onClickDelegate(ownedNft)}
//                className={`p-5 w-full m-3 bg-[${
//                  // TODO: Can someone who understands tailwind fix this please. When delegated it should look disabled.
//                  tokenIsDelegated ? "#A855F7" : "#A855F7"
//                }] shadow-md rounded text-white uppercase md:w-auto md:px-4 md:py-2`}
//              >
//                Tier #{String(tier)} {tokenId}
//              </button>
//            );
//          });
//        })}
//    </div>
//  );
//}
//
//export default React.memo(function WalletAddressPage(): JSX.Element {
//  const { address } = useAccount();
//  const { walletAddress } = useRouter().query;
//
//  if (
//    typeof walletAddress !== "string" ||
//    !ethers.utils.isAddress(walletAddress)
//  )
//    return <></>;
//
//  if (compareAddresses(address, walletAddress))
//    return <WalletAddressPageForCurrentUser />;
//
//  return <WalletAddressPageForAnotherUser walletAddress={walletAddress} />;
//});
//
