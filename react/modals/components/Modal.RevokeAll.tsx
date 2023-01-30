import * as React from "react";
import Modal, { useModalState } from "react-simple-modal-provider";

import { ID_MODAL_REVOKE_ALL } from "@/react/modals/consts";

import { useBaseModalProps } from "../hooks";
import { ModalRevokeAllContent } from "./Modal.RevokeAll.Content";

export function ModalRevokeAll({
  children,
}: React.PropsWithChildren): JSX.Element {
  const modalState = useModalState();
  return (
    <Modal
      {...useBaseModalProps({
        modalState,
        children,
        id: ID_MODAL_REVOKE_ALL,
        renderModalContent: () => <ModalRevokeAllContent />,
      })}
    />
  );
}
