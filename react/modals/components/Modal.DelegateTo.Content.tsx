import { OwnedNft } from "alchemy-sdk";
import * as React from "react";
import { useModalProps } from "react-simple-modal-provider";
import { useDelegateCash } from "use-delegatecash";

import { CONTRACT_ADDRESS_SEWER_PASS } from "@/config";
import { useSewerPasses } from "@/react/api";
import { useAllowModal } from "@/react/modals";
import { ModalDelegateToContentSewerPass } from "@/react/modals/components/Modal.DelegateTo.Content.SewerPass";
import { ID_MODAL_DELEGATE_TO } from "@/react/modals/consts";

export type DelegateTokenCallbackParams = {
  readonly addressToDelegateTo: string;
  readonly token: OwnedNft;
};

export type DelegateTokenCallback = (
  params: DelegateTokenCallbackParams
) => void;

export const ModalDelegateToContent = React.memo(
  function ModalDelegateToContent({
    width = 400,
    onBeforeDelegateToken,
    onAfterDelegateToken,
  }: {
    readonly width?: number;
    readonly onBeforeDelegateToken: DelegateTokenCallback;
    readonly onAfterDelegateToken: DelegateTokenCallback;
  }): JSX.Element {
    const delegateCash = useDelegateCash();
    const { address } = useModalProps(ID_MODAL_DELEGATE_TO);
    const { open: openAllowModal } = useAllowModal();

    // TODO: DO NOT GO LIVE WITH THIS!
    // TODO: HACK use a whale's address.
    const addressToDelegateTo =
      "0x8AD272Ac86c6C88683d9a60eb8ED57E6C304bB0C" || address;

    const { data } = useSewerPasses({
      address: addressToDelegateTo,
    });

    const onClickDelegate = React.useCallback(
      async (token: OwnedNft) => {
        try {
          const params: DelegateTokenCallbackParams = {
            token,
            addressToDelegateTo,
          };

          onBeforeDelegateToken(params);

          requestAnimationFrame(() =>
            openAllowModal({ address: addressToDelegateTo })
          );

          await delegateCash.delegateForToken(
            addressToDelegateTo,
            CONTRACT_ADDRESS_SEWER_PASS,
            parseInt(token.tokenId, 10),
            true
          );

          return onAfterDelegateToken(params);
        } catch (cause) {
          console.error("Failed to delegate token.", { cause });
        }
      },
      [
        onBeforeDelegateToken,
        onAfterDelegateToken,
        delegateCash,
        addressToDelegateTo,
        openAllowModal,
      ]
    );

    return (
      <div>
        <span>Pick a token to delegate:</span>
        <div
          style={{
            overflowX: "scroll",
            scrollBehavior: "smooth",
            width,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            {(data || []).map((ownedNft: OwnedNft, i: number) => (
              <ModalDelegateToContentSewerPass
                {...ownedNft}
                key={String(i)}
                onClickDelegate={() => onClickDelegate(ownedNft)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);
