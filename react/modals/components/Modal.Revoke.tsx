import * as React from "react";
import Modal from "react-simple-modal-provider";

import { ID_MODAL_REVOKE } from "@/react/modals/consts";

import { useBaseModalProps } from "../hooks";

export function ModalRevoke({
  children,
}: React.PropsWithChildren): JSX.Element {
  return (
    <Modal
      {...useBaseModalProps({
        children,
        id: ID_MODAL_REVOKE,
        renderModalContent: () => <span children="revoke" />,
      })}
    />
  );
}
