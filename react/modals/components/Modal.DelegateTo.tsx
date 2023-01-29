import { useRouter } from "next/router";
import * as React from "react";
import Modal, { useModalState } from "react-simple-modal-provider";

import { useDelegatedAddresses } from "@/react/api";
import { useBaseModalProps } from "@/react/modals";
import { ID_MODAL_DELEGATE_TO } from "@/react/modals/consts";

import { ModalDelegateToContent } from "./Modal.DelegateTo.Content";

export function ModalDelegateTo({
  children,
}: React.PropsWithChildren): JSX.Element {
  const modalState = useModalState();
  const [isOpen, setModalState] = modalState;
  const router = useRouter();

  const wasOpen = React.useRef<boolean>(false);

  React.useEffect(() => {
    const { current: wasJustOpen } = wasOpen;
    wasOpen.current = isOpen;

    if (!isOpen && wasJustOpen) router?.replace("/");
  }, [isOpen]);

  const onBeforeDelegateToken = React.useCallback(() => {
    setModalState(false);
  }, [router]);

  // HACK: Since we use react-query, we can ask for delegatedAddresses
  //       to be refreshed here and incur an update for the rest of the
  //       application.
  const { refetch: refetchDelegatedAddresses } = useDelegatedAddresses();

  const onAfterDelegateToken = React.useCallback(
    () => refetchDelegatedAddresses(),
    [refetchDelegatedAddresses]
  );

  return (
    <Modal
      {...useBaseModalProps({
        modalState,
        children,
        id: ID_MODAL_DELEGATE_TO,
        renderModalContent: () => (
          <ModalDelegateToContent
            onBeforeDelegateToken={onBeforeDelegateToken}
            onAfterDelegateToken={onAfterDelegateToken}
          />
        ),
      })}
    />
  );
}
