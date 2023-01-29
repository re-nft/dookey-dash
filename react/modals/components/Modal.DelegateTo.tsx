import * as React from "react";
import Modal, {useModalState} from "react-simple-modal-provider";

import {useBaseModalProps} from "@/react/modals";
import {ID_MODAL_DELEGATE_TO} from "@/react/modals/consts";

import {ModalDelegateToContent} from "./Modal.DelegateTo.Content";

export function ModalDelegateTo({children}: React.PropsWithChildren): JSX.Element {
  const modalState = useModalState();
  const [, setModalState] = modalState;

  const onBeforeDelegateToken = React.useCallback(() => {
    setModalState(false);
  }, []);

  const onAfterDelegateToken = React.useCallback(() => {
    // TODO: refresh list here
  }, []);

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
