import * as React from "react";
import Modal, {useModalState} from "react-simple-modal-provider";

import { ID_MODAL_REVOKE } from "@/react/modals/consts";

import { useBaseModalProps } from "../hooks";
import { ModalRevokeContent } from "./Modal.Revoke.Content";

export function ModalRevoke({
  children,
}: React.PropsWithChildren): JSX.Element {
  const modalState = useModalState();
  return (
    <Modal
      {...useBaseModalProps({
        modalState,
        children,
        id: ID_MODAL_REVOKE,
        renderModalContent: () => <ModalRevokeContent />,
      })}
    />
  );
}
